// @ts-check

/**
 * @typedef {import("@octokit/rest").Octokit} OctokitClient
 * @link https://octokit.github.io/rest.js/v20#usage
 */

/** @typedef {import("@actions/github").context} WorkflowRunContext */

/** @typedef {'SUCCESS_ALL' | 'IN_PROGRESS' | 'FAILED_INPROGRESS' | 'FAILED_AND_COMPLETED' | 'CANCELED' | 'UNKNOWN'} CheckStatus */

const SELF_JOB_NAME = "check_if_all_job_finished"
/** @type {ReadonlyArray<string>} */
const IGNORE_WORKFLOW_NAMES = []
const PER_PAGE = 100

/** @type {(arg: { github: { rest: OctokitClient }, context: WorkflowRunContext }) => Promise<CheckStatus>} */
module.exports = async ({ github, context }) => {
  console.log(`Check For ${context.payload.workflow_run.path}`)

  const fetchRuns = async (page = 1) =>
    github.rest.checks.listForRef({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref: context.sha,
      per_page: PER_PAGE,
      page,
    })

  const otherJobChecks = await fetchRuns(1).then(async (res) => {
    const totalCount = res.data.total_count
    const runsPage1 = res.data.check_runs

    const allRuns = await Promise.all(
      Array.from({ length: Math.ceil(totalCount / PER_PAGE) - 1 })
        .map((_, i) => i + 2)
        .map((page) => fetchRuns(page).then((res) => res.data.check_runs))
    ).then((check_runs) =>
      runsPage1
        .concat(check_runs.flat())
        .filter(
          ({ name }) =>
            name !== SELF_JOB_NAME && !IGNORE_WORKFLOW_NAMES.includes(name)
        )
    )

    return allRuns
  })

  const failedJobChecks = otherJobChecks.filter(
    ({ conclusion }) => conclusion === "failure" || conclusion === "timed_out"
  )

  const notCompletedJobChecks = otherJobChecks.filter(
    ({ status }) => status !== "completed"
  )

  /** @type {CheckStatus} */
  const status = (() => {
    if (failedJobChecks.length > 1) {
      // FAILED
      if (notCompletedJobChecks.length === 0) return "FAILED_AND_COMPLETED"

      return "FAILED_INPROGRESS"
    } else if (notCompletedJobChecks.length === 0) {
      // SUCCESS
      if (
        otherJobChecks.every(
          ({ conclusion }) =>
            conclusion === "success" ||
            conclusion === "skipped" ||
            conclusion === "action_required"
        )
      ) {
        return "SUCCESS_ALL"
      }

      if (otherJobChecks.some(({ conclusion }) => conclusion === "cancelled"))
        return "CANCELED"

      console.log("otherJobChecks", otherJobChecks)
      return "UNKNOWN" // 完了はしているが想定していない conclusion が帰ってきている
    } else {
      // INPROGRESS

      console.log("notCompletedJobChecks", notCompletedJobChecks)
      return "IN_PROGRESS"
    }
  })()

  console.log("status", status)
  return status
}

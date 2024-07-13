export * from "./types"
export { assertMinLength } from "./functions/assert-min-length"
export { typedObjectKeys } from "./functions/typed-object-keys"
export { typedRange } from "./functions/typed-range"
export {
  customErrObj,
  customErr,
  parseZod,
  type CustomErrObj,
} from "./functions/errors"

/** Utility Functions */
export const toMutable = <T>(immutableArray: ReadonlyArray<T>): Array<T> =>
  immutableArray.slice()

export function assertNonNull<T>(value: T): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error(
      `Expected value to be non-null, but received ${String(value)}`
    )
  }
}

export const exhaustiveCheckAndThrow = (value: never): never => {
  throw new Error(`ExhaustiveCheckFailed. value: ${String(value)}`)
}

export const typedIncludes = <T, Tuple extends ReadonlyArray<T>>(
  tuple: Tuple,
  value: T
): value is Tuple[number] => tuple.includes(value)

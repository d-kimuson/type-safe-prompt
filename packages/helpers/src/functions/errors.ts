import { ok, err, errAsync } from "neverthrow"
import type { Expand } from "@/types.js"
import type { ResultAsync, Err } from "neverthrow"
import type { z } from "zod"

export type CustomErrObj<
  K extends string,
  RawData,
  Data = RawData extends null | undefined ? Record<string, never> : RawData,
> = Expand<{ readonly kind: K } & Data>

export const customErrObj = <const K extends string, const RawData>(
  kind: K,
  data: RawData
): CustomErrObj<K, RawData> =>
  // @ts-expect-error -- いい感じになるので問題ない
  ({
    kind,
    ...(data ?? {}),
  })

export const customErr = <
  const K extends string,
  const IsAsync extends boolean = false,
  const RawData = unknown,
  ErrObj = CustomErrObj<K, RawData>,
>(
  kind: K,
  options?: {
    isAsync?: IsAsync
    data?: RawData
  }
): false extends IsAsync ? Err<never, ErrObj> : ResultAsync<never, ErrObj> => {
  const errObj = customErrObj(kind, options?.data)

  // @ts-expect-error -- いい感じになるので問題ない
  return options?.isAsync ?? false ? errAsync(errObj) : err(errObj)
}

export const parseZod = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- extends 用なので許容
  S extends z.ZodType<any, any, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- extends 用なので許容
  O = S extends z.ZodType<infer I, any, any> ? I : never,
>(
  schema: S,
  data: unknown
) => {
  return ok(schema.safeParse(data)).andThen((parsed) => {
    if (parsed.success) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return ok<O>(parsed.data)
    } else {
      return customErr("ZOD_VALIDATION_ERROR", {
        isAsync: false,
        data: {
          error: parsed.error,
        },
      })
    }
  })
}

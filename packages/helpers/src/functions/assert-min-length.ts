import type { ArrayAtLeastN } from "@/types"

export const assertMinLength = <T, L extends number>(
  arr: T[],
  length: L
): ArrayAtLeastN<T, L> => {
  if (arr.length < length)
    throw new TypeError(
      `Type assertion failed. arr.length should be gt ${length.toString()}, but get ${arr.length.toString()}`
    )
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- 厳格にするためなのでOK
  return arr as unknown as ArrayAtLeastN<T, L>
}

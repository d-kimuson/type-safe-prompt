/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
export type TypeEq<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false

/**
 * @desc Type testing with a set of TypeEq.
 * @example Assert<TypeEq<string, string>>  // valid
 * @example Assert<TypeEq<string, number>>  // invalid (error)
 */
export type Assert<Describe extends string, T extends true> = {
  __type: "Assert"
  isValid: T
  description: Describe
}

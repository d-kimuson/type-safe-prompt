/* eslint-disable @typescript-eslint/consistent-type-assertions */

import type { IsNever } from "../types"

type IsStrUnion<T, Tmp = T extends string ? true : false> = boolean extends Tmp
  ? true
  : false
type IsLiteral<T, Base> = Base extends T ? false : T extends Base ? true : false

type _IsPossibleUndef<T> = T extends undefined ? "true" : never
type IsPossibleUndef<T, V = _IsPossibleUndef<T>> =
  IsNever<V> extends false ? true : false
type RemoveOmittable<T extends object> = {
  [K in keyof T as IsPossibleUndef<T[K]> extends true ? never : K]: T[K]
}

export const typedObjectKeys = <
  Obj extends object,
  T = keyof Obj,
  IsLiteralStr = IsLiteral<T, string>,
  IsLiteralNum = IsLiteral<T, number>,
>(
  target: Obj
) =>
  Object.keys(target) as unknown as boolean extends IsLiteralStr
    ? T[]
    : IsLiteralStr extends true
      ? T[]
      : IsLiteralNum extends true
        ? T extends number
          ? `${T}`[]
          : never
        : IsStrUnion<T> extends true
          ? string[]
          : (keyof typeof target)[] // prohibit { [K: number]: any }

/**
 * @desc Contains optional properties
 */

export const typedObjectKeysStrict = <Obj extends object>(target: Obj) => {
  return typedObjectKeys(target as RemoveOmittable<Obj>)
}

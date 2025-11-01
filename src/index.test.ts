import { describe, it, expect } from "vitest"
import type { Assert, TypeEq } from "./type-utils"
import { fillPrompt } from "."

const promptWithNoVariables = `
hello
`

describe("when prompted with no variables", () => {
  it("should be called with an empty object", () => {
    const actual = fillPrompt(promptWithNoVariables, {})

    expect(actual).toBe(`\nhello\n`)
    // @ts-expect-error -- for type test
    type _It = Assert<
      "return type should match the type of the prompt",
      TypeEq<"\nhello\n", typeof actual>
    >
  })
})

const promptWithSingleVariable = `
your name is {{name}}.
`

describe("when prompted with single variable", () => {
  it("should be called with correct variable object", () => {
    const name = "Alice"
    const actual = fillPrompt(promptWithSingleVariable, {
      name,
    })

    expect(actual).toBe(`\nyour name is ${name}.\n`)
    // @ts-expect-error -- for type test
    type _It = Assert<
      "return type should same as the string with the variable portion of the prompt replaced by the value",
      TypeEq<"\nyour name is Alice.\n", typeof actual>
    >
  })

  it("should not be called with empty object", () => {
    // @ts-expect-error -- type test
    const actual = fillPrompt(promptWithSingleVariable, {})
    expect(actual).toBe(promptWithSingleVariable)
  })

  it("should not be called with incorrect object", () => {
    const actual = fillPrompt(promptWithSingleVariable, {
      // @ts-expect-error -- type test
      miss: "hello",
    })
    expect(actual).toBe(promptWithSingleVariable)
  })
})

const promptWithMultipleVariables = `
your name is {{name}}.
your role is {{role}}.
`

describe("when prompted with multiple variables", () => {
  it("should be called with correct variable object", () => {
    const name = "Alice"
    const role = "Engineer"
    const actual = fillPrompt(promptWithMultipleVariables, {
      name,
      role,
    })

    expect(actual).toBe(`\nyour name is ${name}.\nyour role is ${role}.\n`)
    // @ts-expect-error -- for type test
    type _It = Assert<
      "return type should same as the string with the variable portion of the prompt replaced by the value",
      TypeEq<"\nyour name is Alice.\nyour role is Engineer.\n", typeof actual>
    >
  })

  it("should not be called with empty object", () => {
    // @ts-expect-error -- type test
    const actual = fillPrompt(promptWithMultipleVariables, {})
    expect(actual).toBe(promptWithMultipleVariables)
  })

  it("should not be called with incorrect object", () => {
    const actual = fillPrompt(promptWithMultipleVariables, {
      name: "Alice",
      // @ts-expect-error -- type test
      miss: "missed",
    })
    expect(actual).toBe("\nyour name is Alice.\nyour role is {{role}}.\n")
  })
})

const promptWithMultipleTimesVariable = `
your name is {{name}}.
please call me {{name}}.
`

describe("When a variable is used multiple times in a prompt", () => {
  it("all should be replaced", () => {
    const name = "Alice"
    const actual = fillPrompt(promptWithMultipleTimesVariable, {
      name,
    })

    expect(actual).toBe(`\nyour name is ${name}.\nplease call me ${name}.\n`)
    // @ts-expect-error -- for type test
    type _It = Assert<
      "ReturnType should same as the string with the variable portion of the prompt replaced by the value",
      TypeEq<"\nyour name is Alice.\nplease call me Alice.\n", typeof actual>
    >
  })
})

const promptNonEnglish = `
你的名字是 {{name}}.
`

describe("when prompted with non-English variable", () => {
  it("should be called with correct variable object with const string type", () => {
    const name = "Alice"
    const actual = fillPrompt(promptNonEnglish, {
      name,
    })

    expect(actual).toBe(`\n你的名字是 ${name}.\n`)
    // @ts-expect-error -- for type test
    type _It = Assert<
      "return type should same as the string with the variable portion of the prompt replaced by the value",
      TypeEq<"\n你的名字是 Alice.\n", typeof actual>
    >
  })

  it("should be called with correct variable object with string type", () => {
    const name: string = "Alice"
    const actual = fillPrompt(promptNonEnglish, {
      name,
    })

    expect(actual).toBe(`\n你的名字是 ${name}.\n`)
    // @ts-expect-error -- for type test
    type _It = Assert<
      "return type should same as the string with the variable portion of the prompt replaced by the value",
      TypeEq<"\n你的名字是 ${name}.\n", typeof actual>
    >
  })
})

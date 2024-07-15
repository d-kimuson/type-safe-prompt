# type-safe-prompt

type-safe-prompt is a lightweight library for handling prompts with embeddable variables in a type-safe manner.

## Installation

The package is available on the npm registry. You can install it using your preferred package manager:

```bash
$ npm install type-safe-prompt
# or
$ yarn add type-safe-prompt
# or
$ pnpm add type-safe-prompt
```

## Usage

Define your prompt template using a constant:

```typescript
const prompt = `
You are {{name}}, a {{role}}.
Please respond politely to user requests.
`
```

Use the `fillPrompt` function to embed variables into the template. This provides type safety for variable specification:

```typescript
import { fillPrompt } from "type-safe-prompt"

// This will cause a type error because the required variables 'role' and 'name' are missing
const filledPrompt = fillPrompt(prompt, {})

// This will also cause a type error due to missing required variables and an incorrect variable name
const filledPrompt = fillPrompt(prompt, {
  miss: "Alice",
})
```

When there are no type errors, you can see the resolved prompt text at the type level:

```typescript
const filledPrompt = fillPrompt(prompt, {
  name: "Alice",
  role: "Engineer",
}) // => "\nYou are Alice, a Engineer.\nPlease respond politely to user requests.\n"
```

This is useful as it allows you to verify the content of the resolved prompt without actually executing the code at runtime.

## When should you use this library? (And when shouldn't you?)

When defining templates with embeddable variables, you might first think of using template literals like this:

```typescript
const myPrompt = (vars: { [K in "name"]: readonly string }) => {
  return `
your name is ${vars.name}
`
}
```

This library does essentially the same thing, but makes this pattern more convenient and easier to implement.

Benefits of using type-safe-prompt:

1. Avoid indentation issues: Wrapping prompts in functions can break indentation and reduce readability. With type-safe-prompt, you can declare prompt templates at the top level, preserving proper formatting.
2. Reduce boilerplate: While abstracting templates with functions isn't overly complex, it can be tedious to write repeatedly. type-safe-prompt allows you to define templates as simple strings.
3. Proper return type inference: The library provides appropriate type information for the resolved prompts.

If these benefits don't appeal to you, you might not need type-safe-prompt. If you're not concerned about indentation and prefer to avoid additional dependencies over the verbosity of writing functions, using plain template literals might be a better choice.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome!

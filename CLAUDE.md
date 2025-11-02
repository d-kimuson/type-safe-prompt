# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

type-safe-prompt is a TypeScript library that provides type-safe handling of prompts with embeddable variables. The library uses advanced TypeScript type system features to extract variables from template strings (e.g., `{{name}}`) and ensure type-safe variable substitution at compile time.

## Core Architecture

The library consists of three main components:

1. **Type Extraction System** (src/index.ts:2-7): The `ExtractPromptVariables` type recursively parses template strings to extract variable names enclosed in `{{...}}` syntax, building a union type of all variable names.

2. **Type-Level String Interpolation** (src/index.ts:9-14): The `FilledPrompt` type performs template string substitution at the type level, allowing TypeScript to infer the final resolved string type.

3. **Runtime Implementation** (src/index.ts:16-32): The `fillPrompt` function performs the actual string replacement at runtime while preserving type information through conditional types and `const` type parameters.

## Development Commands

**Important**: Only the following commands should be used. Other commands like `pnpm build`, `pnpm dev`, `pnpm lint`, and `pnpm release` are not needed and should not be executed.

- `pnpm typecheck` - Run TypeScript type checking without emitting files (required for quality verification)
- `pnpm fix` - Auto-fix all fixable issues (eslint, prettier formatting, etc.)
- `pnpm test` - Run all tests using vitest (required for quality verification)

## Key Technical Considerations

### TypeScript Advanced Types

The library heavily uses advanced TypeScript features:

- Recursive conditional types for template string parsing
- Template literal types for pattern matching
- `const` type parameters for literal type preservation
- Type-level string manipulation

### Testing Strategy

Tests (src/index.test.ts) focus on:

- Type-level assertions using the `Assert` and `TypeEq` utilities from type-utils.ts
- Runtime behavior verification
- Edge cases in variable extraction and substitution

## Code Quality Standards

For code changes:

- TypeScript must compile without errors (`pnpm typecheck` must pass)
- All tests must pass (`pnpm test` must pass)
- Auto-fixable issues should be resolved (`pnpm fix` should be run and any remaining issues must be manually fixed)

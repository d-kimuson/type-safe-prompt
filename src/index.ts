export type ExtractPromptVariables<
  T extends string,
  Vars = never,
> = T extends `${infer Before}{{${infer I}}}${infer After}`
  ? ExtractPromptVariables<`${Before}${After}`, Vars | I>
  : Vars

export type FilledPrompt<
  T extends string,
  Vars extends { [K: string]: string },
> = T extends `${infer Before}{{${infer I}}}${infer After}`
  ? FilledPrompt<`${Before}${Vars[I]}${After}`, Vars>
  : T

export const fillPrompt = <
  const Template extends string,
  const Vars extends {
    [K in VariableNames]: string
  },
  VariableNames extends string = ExtractPromptVariables<Template>,
>(
  template: Template,
  vars: Vars
) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return Object.entries(vars).reduce(
    (template: string, [key, value]) =>
      template.replaceAll(`{{${key}}}`, String(value)),
    template
  ) as FilledPrompt<Template, Vars>
}

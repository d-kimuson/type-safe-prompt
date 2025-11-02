export type ExtractPromptVariables<
  T extends string,
  Vars = never,
> = T extends `${infer Before}{{${infer I}}}${infer After}`
  ? ExtractPromptVariables<`${Before}${After}`, Vars | I>
  : Vars;

type DecorationVarKey<T extends string> = `\${${T}}`

export type FilledPrompt<
  T extends string,
  Vars extends { [K: string]: string },
> = T extends `${infer Before}{{${infer I}}}${infer After}`
  ? FilledPrompt<
      `${Before}${string extends Vars[I] ? DecorationVarKey<I> : Vars[I]}${After}`,
      Vars
    >
  : T

export const fillPrompt = <
  const Template extends string,
  const Vars extends {
    [K in VariableNames]: string;
  },
  VariableNames extends string = ExtractPromptVariables<Template>,
>(
  template: Template,
  vars: Vars,
) => {
  return Object.entries(vars).reduce(
    (template: string, [key, value]) =>
      template.replaceAll(`{{${key}}}`, String(value)),
    template,
  ) as FilledPrompt<Template, Vars>;
};

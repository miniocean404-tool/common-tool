declare type FlatmapSplitWithDelemiters<
  Inputs extends readonly string[],
  Delemiters extends readonly string[],
  Acc extends string[] = [],
> = Inputs extends [infer FirstInput, ...infer RestInputs]
  ? FirstInput extends string
    ? RestInputs extends readonly string[]
      ? FlatmapSplitWithDelemiters<RestInputs, Delemiters, [...Acc, ...SplitWithDelemiters<FirstInput, Delemiters>]>
      : Acc
    : Acc
  : Acc

declare type Split<
  Input extends string,
  Delimiter extends string,
  Acc extends string[] = [],
> = Input extends `${infer Prefix}${Delimiter}${infer Suffix}`
  ? Split<Suffix, Delimiter, [...Acc, Prefix]>
  : [...Acc, Input]

declare type Drop<Arr extends readonly unknown[], Remove, Acc extends unknown[] = []> = Arr extends [
  infer Head,
  ...infer Tail,
]
  ? Head extends Remove
    ? Drop<Tail, Remove>
    : Drop<Tail, Remove, [...Acc, Head]>
  : Acc

declare type SplitWithDelemiters<Input extends string, Delemiters extends readonly string[]> = Delemiters extends [
  infer FirstDelemiter,
  ...infer RestDelemiters,
]
  ? FirstDelemiter extends string
    ? RestDelemiters extends readonly string[]
      ? FlatmapSplitWithDelemiters<Split<Input, FirstDelemiter>, RestDelemiters>
      : never
    : never
  : [Input]

declare type BeginSubclassSelectorTokens = [".", "#", "[", ":"]

declare type CombinatorTokens = [" ", ">", "+", "~", "|", "|"]

declare type CompoundSelectorsOfComplexSelector<ComplexSelector extends string> = SplitWithDelemiters<
  ComplexSelector,
  CombinatorTokens
> extends infer IntermediateTokens
  ? IntermediateTokens extends readonly string[]
    ? Drop<IntermediateTokens, "">
    : never
  : never

declare type NonEmptyReadonlyArray<T> = [T, ...(readonly T[])]

declare type TypeSelectorOfCompoundSelector<CompoundSelector extends string> = SplitWithDelemiters<
  CompoundSelector,
  BeginSubclassSelectorTokens
> extends infer CompoundSelectorTokens
  ? CompoundSelectorTokens extends [infer TypeSelector, ...any[]]
    ? TypeSelector extends ""
      ? unknown
      : TypeSelector
    : never
  : never

declare type Last<Arr extends NonEmptyReadonlyArray<unknown>> = Arr extends [infer Head, ...infer Tail]
  ? Tail extends NonEmptyReadonlyArray<unknown>
    ? Last<Tail>
    : Head
  : never

export declare type ElementFor<TagName extends keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap> =
  TagName extends keyof HTMLElementTagNameMap
    ? HTMLElementTagNameMap[TagName]
    : TagName extends keyof SVGElementTagNameMap
    ? SVGElementTagNameMap[TagName]
    : never

declare type TypeSelectorOfComplexSelector<ComplexSelector extends string> =
  CompoundSelectorsOfComplexSelector<ComplexSelector> extends infer CompoundSelectors
    ? CompoundSelectors extends NonEmptyReadonlyArray<string>
      ? Last<CompoundSelectors> extends infer LastCompoundSelector
        ? LastCompoundSelector extends string
          ? TypeSelectorOfCompoundSelector<LastCompoundSelector>
          : never
        : never
      : unknown
    : never

export declare type NodeFor<ComplexSelector extends string> =
  TypeSelectorOfComplexSelector<ComplexSelector> extends infer TypeSelector
    ? TypeSelector extends keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
      ? ElementFor<TypeSelector>
      : Element
    : never

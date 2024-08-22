// 元素选择器的前缀标识
type BeginSubclassSelectorTokens = [".", "#", "[", ":"]

// 元素分隔符
type CombinatorTokens = [" ", ">", "+", "~", "|", "|"]

// 不为空的只读数组
type NonEmptyReadonlyArray<T> = [T, ...(readonly T[])]

// 获取数组最后一个元素
type Last<Arr extends NonEmptyReadonlyArray<unknown>> = Arr extends [infer Head, ...infer Tail]
  ? Tail extends NonEmptyReadonlyArray<unknown>
    ? Last<Tail>
    : Head
  : never

// 根据字符串将 前缀 和 后缀 分割，并获取其具体值，然后递归将后缀字符串继续分割
// 例：type Resut = Split<"a _ > b > c", ">"> => ["a _ ", " b ", " c"]
// 例：type Resut = Split<">", ">"> => ["", ""]
type Split<Input extends string, Delimiter extends string, Acc extends string[] = []> =
  // `${infer Prefix}${Delimiter}${infer Suffix}` 可以推断字符串的具体值
  Input extends `${infer Prefix}${Delimiter}${infer Suffix}`
    ? Split<Suffix, Delimiter, [...Acc, Prefix]>
    : [...Acc, Input]

// 删除数组中某个元素
type Drop<Arr extends readonly unknown[], Remove, Acc extends unknown[] = []> = Arr extends [infer Head, ...infer Tail]
  ? Head extends Remove
    ? Drop<Tail, Remove>
    : Drop<Tail, Remove, [...Acc, Head]>
  : Acc

// 依次获取每一个元素进行分割，最终获取元素 tag
// 1. 右侧是将第一次分割的字符串继续使用剩余所有的分割符进行递归分割，左侧是将剩余的按照 1 的方式继续分割
// 例：type Resut = FlatmapSplitWithSeps<["a+", ">", "c"], [">", "+", "~", "|", "|"]> => ["a", "", "", "", "c"]
type FlatmapSplitWithSeps<
  Inputs extends readonly string[],
  Seps extends readonly string[],
  Acc extends string[] = [],
> = Inputs extends [infer FirstInput, ...infer RestInputs]
  ? FirstInput extends string
    ? RestInputs extends readonly string[]
      ? FlatmapSplitWithSeps<RestInputs, Seps, [...Acc, ...SplitWithSeps<FirstInput, Seps>]>
      : Acc
    : Acc
  : Acc

// 递归将字符串按照分隔符分割，第一次是空格
// 例如 type Result = SplitWithSeps<"a+ > c", CombinatorTokens> => ["a", "", "", "", "c"]
type SplitWithSeps<Input extends string, Seps extends readonly string[]> = Seps extends [
  infer FirstDelemiter,
  ...infer RestSeps,
]
  ? FirstDelemiter extends string
    ? RestSeps extends readonly string[]
      ? // 将字符串分割的不能再分割了以后，将获取的字符串继续分割 FlatmapSplitWithSeps<["a", ">", "c"] , [">", "+", "~", "|", "|"]>
        FlatmapSplitWithSeps<Split<Input, FirstDelemiter>, RestSeps>
      : never
    : never
  : [Input]

// 获 div.indicator、input[type=password] 这种选择器字符串获取具体的 html 元素类型
type TypeSelectorOfCompoundSelector<CompoundSelector extends string> = SplitWithSeps<
  CompoundSelector,
  BeginSubclassSelectorTokens
> extends infer CompoundSelectorTokens
  ? CompoundSelectorTokens extends [infer TypeSelector, ...any[]]
    ? TypeSelector extends ""
      ? unknown
      : TypeSelector
    : never
  : never

type CompoundSelectorsOfComplexSelector<ComplexSelector extends string> = SplitWithSeps<
  ComplexSelector,
  CombinatorTokens
> extends infer IntermediateTokens
  ? IntermediateTokens extends readonly string[]
    ? Drop<IntermediateTokens, "">
    : never
  : never

export type ElementFor<TagName extends keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap> =
  TagName extends keyof HTMLElementTagNameMap
    ? HTMLElementTagNameMap[TagName]
    : TagName extends keyof SVGElementTagNameMap
    ? SVGElementTagNameMap[TagName]
    : never

// 根据 CompoundSelectorsOfComplexSelector 获取到最终的元素数组后获取最后一个元素，通过 TypeSelectorOfCompoundSelector 将选择器标识及右侧去除，最终获取到元素类型字符串
type TypeSelectorOfComplexSelector<ComplexSelector extends string> =
  CompoundSelectorsOfComplexSelector<ComplexSelector> extends infer CompoundSelectors
    ? CompoundSelectors extends NonEmptyReadonlyArray<string>
      ? Last<CompoundSelectors> extends infer LastCompoundSelector
        ? LastCompoundSelector extends string
          ? TypeSelectorOfCompoundSelector<LastCompoundSelector>
          : never
        : never
      : unknown
    : never

// 根据 TypeSelectorOfComplexSelector 获取的元素类型字符串，获取具体的 html 元素类型
export type NodeFor<ComplexSelector extends string> =
  // 根据选择器字符串获取具体 html 元素类型
  TypeSelectorOfComplexSelector<ComplexSelector> extends infer TypeSelector
    ? TypeSelector extends keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
      ? // 根据元素字符串获取具体 html 元素类型
        ElementFor<TypeSelector>
      : Element
    : never

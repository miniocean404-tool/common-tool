type ResultField<Count extends number, Result extends string[] = []> = Result["length"] extends Count
  ? Result[number]
  : ResultField<Count, [...Result, `p${Result["length"]}`]>

type GeneratorObject<Count extends number> = {
  [Key in ResultField<Count>]: string
}

type List = GeneratorObject<5>

// 假设我一个枚举
enum ENUM_TYPE {
  ALL = "all",
  SOME = "some",
  LITTLE = "little",
}

// 枚举满足这个约束是因为枚举是遍历每一个值的，相当于联合类型
type EnumValue<T extends string | number | bigint | boolean | null | undefined> = `${T}`
type EnumKey<T> = keyof T

// 获取枚举的 value
type IValue = EnumValue<ENUM_TYPE> // 'all' | 'some' | 'little'

// 获取枚举的 key
type IKey = EnumKey<typeof ENUM_TYPE> // 'ALL' | 'SOME' | 'LITTLE'

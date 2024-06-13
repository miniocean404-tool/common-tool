// 假设我一个枚举
enum ENUM_TYPE {
  ALL = "all",
  SOME = "some",
  LITTLE = "little",
}

type EnumValue<T extends string | number | bigint | boolean | null | undefined> = `${T}`
type EnumKey<T> = keyof T

// 获取枚举的 value
type IValue = EnumValue<ENUM_TYPE> // 'all' | 'some' | 'little'

// 获取枚举的 key
type IKey = EnumKey<typeof ENUM_TYPE> // 'ALL' | 'SOME' | 'LITTLE'

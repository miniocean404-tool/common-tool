import { customRef } from "vue"

export function doubounceRef<T>(value: T, delay = 200) {
  let timer: number
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue: T) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}

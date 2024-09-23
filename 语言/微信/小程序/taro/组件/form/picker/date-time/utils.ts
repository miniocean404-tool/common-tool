import { MAX_YEAR, MIN_YEAR } from "./constant"

// 真实月份
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate()
}

interface RangeProp {
  key: string
  value: string | number
}

export const getDateRange = (year: number, month: number) => {
  const yearRange: RangeProp[] = []
  const mouthRange: RangeProp[] = []
  const dayRange: RangeProp[] = []

  for (let i = MIN_YEAR; i <= MAX_YEAR; i++) {
    yearRange.push({ key: `${i}年`, value: i })
  }
  for (let i = 1; i <= 12; i++) {
    mouthRange.push({ key: `${i}月`, value: i })
  }

  const day_in_month = getDaysInMonth(year, month)
  for (let i = 1; i <= day_in_month; i++) {
    dayRange.push({ key: `${i}日`, value: i })
  }

  return {
    yearRange,
    mouthRange,
    dayRange,
  }
}

export const getTimeRange = () => {
  const hoursRange: RangeProp[] = []
  const minuteRange: RangeProp[] = []

  for (let i = 0; i <= 23; i++) {
    hoursRange.push({ key: `${i} 时`, value: i })
  }

  for (let i = 0; i <= 59; i++) {
    minuteRange.push({ key: `${i} 分`, value: i })
  }

  return {
    hoursRange,
    minuteRange,
  }
}

export function getTimeGapRange(gap?: number) {
  if (gap) {
    const timeUnits: RangeProp[] = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += gap || 30) {
        const formattedHour = hour.toString().padStart(2, "0")
        const formattedMinute = minute.toString().padStart(2, "0")
        timeUnits.push({ key: `${formattedHour}:${formattedMinute}`, value: `${formattedHour}:${formattedMinute}` })
      }
    }
    return timeUnits
  }

  return []
}

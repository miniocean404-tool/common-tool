// 需要开启 "strictNullChecks": true,
export interface BaseResp<T> {
  status: Status
  data?: T | undefined
  isSuccess: boolean
}

interface Status {
  code: string
  errorCode: string
  errorDescription: string
}

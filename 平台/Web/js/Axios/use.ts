import type { BaseResp } from "./base-resp"
import request from "./request"
import type { AxiosResponse } from "axios"

const useApi = (data) => {
  return new Promise((resolve) => {
    request
      .post("", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        resolve([null, res])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}

export function loginApi<T = BaseResp<any>>(data): Promise<[Error | null, AxiosResponse<T> | null]> {
  const url = ""

  return new Promise((resolve) => {
    request
      .post<T>(url, data)
      .then((res) => {
        resolve([null, res])
      })
      .catch((err) => {
        resolve([err, null])
      })
  })
}

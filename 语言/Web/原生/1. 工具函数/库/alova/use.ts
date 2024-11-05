function getAlovaStoreInviteListApi({ phone, name, dateStr, driverStatus, status, driverStore }: any) {
  const res = alovaInst.Post<any, Taro.request.SuccessCallbackResult<BaseResp<any>>>(
    "/test/driver/store/list",
    {
      phone,
      name,
      dateStr,
      driverStatus,
      status,
      driverStore,
    },
    {
      transform: (res, headers) => {
        if (res.data?.data) {
          return res.data?.data
        } else {
          return []
        }
      },
    },
  )

  return res
}

const { loading, data, send } = useRequest((params) => getAlovaStoreInviteListApi(params), {
  initialData: [],
  immediate: false,
})
  .onSuccess(async ({ data, method }) => {
    if (tab.index === 0) {
      const resp = await getAlovaStoreInviteListApi({ ...queryRef.current, driverStatus: "1" })
      setTab({ left: { ...tab.left, count: data?.length }, right: { ...tab.right, count: resp?.length || 0 } })
    } else {
      const resp = await getAlovaStoreInviteListApi({ ...queryRef.current, driverStatus: "0" })
      setTab({ left: { ...tab.left, count: resp?.length || 0 }, right: { ...tab.right, count: data?.length || 0 } })
    }
  })
  .onError(({ error }) => {
    showBackEndMessage(error)
  })

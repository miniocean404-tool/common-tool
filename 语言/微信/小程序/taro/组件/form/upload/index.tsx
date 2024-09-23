import camera from "@/assets/upload/camera.png"
import refresh from "@/assets/upload/refresh.png"
import { Image, Text, View, type ImageProps } from "@tarojs/components"
import { chooseImage, getStorageSync, showToast, uploadFile } from "@tarojs/taro"
import { forwardRef, useCallback, useImperativeHandle, useState, type ForwardedRef, useEffect } from "react"
import "./index.less"

interface DavUploadProps {
  className?: string
  cardClass?: string
  upUrl?: string
  field?: string
  upSuccess?: (res: any) => void
  beforeUpload?: () => void
  upText?: string
  imageMode?: keyof ImageProps.Mode
  parentRef?: ForwardedRef<DavUploadRef>
  exampleImage?: string
  formData?: Object
  desc?: string
}

interface DavUploadRef {
  clear: () => void
}

function DavUpload({
  className,
  cardClass,
  upUrl = "",
  field = "file",
  upSuccess,
  beforeUpload,
  upText = "重新上传",
  imageMode = "aspectFit",
  parentRef,
  exampleImage,
  formData,
  desc,
}: DavUploadProps) {
  const [isFinish, setIsFinish] = useState(false)
  const [upImg, setUpImg] = useState("")

  useEffect(() => {
    // @ts-ignore
    upUrl = BASE_URL + upUrl
  }, [])

  useImperativeHandle(parentRef, () => ({ clear }), [])

  const startSelect = useCallback(async () => {
    await chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success(o) {
        const { tempFilePaths, errMsg } = o
        if (errMsg !== "chooseImage:ok") return showToast({ icon: "error", title: "调用失败" })

        beforeUpload && beforeUpload()

        uploadFile({
          url: upUrl, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: field,
          header: {
            "wmp-token": getStorageSync("token"),
            "Content-Type": "multipart/form-data",
          },
          formData,
          success: function (res) {
            upSuccess && upSuccess(res)

            setUpImg(tempFilePaths[0])
            setIsFinish(true)
          },
        })
      },
    })
  }, [upUrl])

  const clear = () => {
    setUpImg("")
    setIsFinish(false)
  }

  return (
    <>
      <View id="dav-upload" className={className} onClick={startSelect}>
        <View className={`upload-card-container ${cardClass || ""}`}>
          {!upImg && <Image className="bottom-tip-img" src={exampleImage || ""} mode="aspectFit" />}

          {upImg && <Image src={upImg} className="finish-img" mode={imageMode} />}

          <Image className="state" src={isFinish ? refresh : camera} mode="aspectFit" />
        </View>

        {upImg && (
          <View className="up-tip-text">
            <Text>{desc}</Text>

            {upText && (
              <Text className="reload" onClick={startSelect}>
                upText
              </Text>
            )}
          </View>
        )}
      </View>
    </>
  )
}

// 正常情况下 ref 是不能挂在到函数组件上的，因为函数组件没有实例，
// 但是 useImperativeHandle 为我们提供了一个类似实例的东西。
// 它帮助我们通过 useImperativeHandle 的第 2 个参数，所返回的对象的内容挂载到 父组件的 ref.current 上。

// forwardRef会创建一个React组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件的 props 中。
export default forwardRef<DavUploadRef, Omit<DavUploadProps, "parentRef">>((props, ref) => {
  return <DavUpload {...props} parentRef={ref}></DavUpload>
})

// 文章：https://juejin.cn/post/7382966707060703268?share_token=91713cfd-d861-496c-bdc0-db4ea0e75844#heading-0

import dayjs from "dayjs"
import ffmpeg from "fluent-ffmpeg"
import fs from "fs"
// @ts-ignore
import { Parser } from "m3u8-parser"
import path from "path"
import z from "zod"

await download("https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8")

export async function download(url: string) {
  // 1. 解析 m3u8 文件
  const content = await fetch(url).then((res) => res.text())
  const parser = new Parser()

  parser.push(content)
  parser.end()

  if (!isValidManifest(parser.manifest)) {
    throw new Error("无效的 m3u8 Manifest")
  }

  const segments =
    parser.manifest.segments?.map((segment: any, i: number) => ({
      uri: parseUri(url, segment.uri),
      index: i,
    })) ?? []

  const downloaded: string[] = []
  await Promise.allSettled(
    segments?.map(async (segment) => {
      const fileId = `${segment.index}.ts`
      const res = await fetch(segment.uri)
      const file = await res.arrayBuffer()

      fs.writeFileSync(path.join(process.cwd(), `./data/${fileId}`), Buffer.from(file))
      downloaded.push(fileId)
    }),
  )
  const downloadedIds = [...downloaded].sort((a, b) => parseInt(a.split(".")[0]) - parseInt(b.split(".")[0]))

  // 3. 合并所有片段
  const outputFileName = dayjs().format("YYYY-MM-DDTHH:mm:ss")

  await new Promise((resolve, reject) => {
    var videos = ffmpeg()

    downloadedIds.forEach(function (videoName) {
      videos = videos.addInput(path.join(process.cwd(), `./data/${videoName}`))
    })

    // 必须安装 ffmpeg
    // fluent-ffmpeg 必须条件：https://github.com/fluent-ffmpeg/node-fluent-ffmpeg?tab=readme-ov-file#prerequisites
    videos
      .mergeToFile(path.join(process.cwd(), `./data/${outputFileName}.mp4`), path.join(process.cwd(), `./data`))
      .on("error", function (err) {
        console.log("An error occurred: " + err.message)
      })
      .on("end", function () {
        console.log("Merging finished !")
      })
  })
}

function isValidManifest(manifest: any) {
  const segmentsLength = manifest.segments?.length ?? 0
  const playlistsLength = manifest.playlists?.length ?? 0
  return segmentsLength > 0 || playlistsLength > 0
}

function parseUri(base: string, uri: string) {
  const isUrl = z.string().url().safeParse(uri).success
  if (isUrl) return uri

  const baseURL = new URL(base)
  const basePathname = baseURL.pathname.replace(/\/+$/, "").split("/").slice(0, -1).join("/")
  const pathname = `${basePathname}/${uri}`
  const parsedURL = new URL(pathname, baseURL)

  return parsedURL.toString()
}

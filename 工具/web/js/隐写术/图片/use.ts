import { decodeImage } from "./decode";
import { write_hidden_to_origin } from "./encode";
import { get_image_info } from "./utils";

async function encode(showImageUrl: string, hiddenImageUrl: string) {
  const targetData = await get_image_info(showImageUrl);
  let hiddenData = await get_image_info(hiddenImageUrl);

  if (targetData && hiddenData) {
    const scale = Math.round((targetData.binary.length / 8 / hiddenData.binary.length) * 100) / 100;
    // 获取缩放后的图片
    hiddenData = await get_image_info(hiddenImageUrl, scale);
    hiddenData &&
      write_hidden_to_origin(hiddenData, targetData, targetData.imageDate.width, targetData.imageDate.height);
  }
}

async function decode(decoderImgUrl: string) {
  const decodeDate = await get_image_info(decoderImgUrl);
  // 解密时需要知道原始图片的尺寸
  decodeDate && decodeImage(decodeDate, 273, 273);
}

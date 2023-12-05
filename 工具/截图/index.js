// html-to-image 更好用
import domtoimage from "dom-to-image";

const screenshot = async (dom) => {
  window.devicePixelRatio;
  // svg 转图片后文字换行是设备缩放问题，鼠标滚动或者设置 zoom 放大到原值就正常了
  const base64 = await domtoimage.toSvg(dom);
  return base64;
};

// 原理是将画布放大 N 倍后，将图片缩小 N 倍，这样就可以得到高清的图片了
function imageToPngBase64(image, scale) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  scale = window.devicePixelRatio * scale;

  canvas.width = image.width * scale;
  canvas.height = image.height * scale;

  ctx?.scale(scale, scale);
  ctx && ctx.drawImage(image, 0, 0, image.width, image.height);
  return canvas.toDataURL("image/png");
}

async function download(filename, url) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}

const exec = async () => {
  const SVGBase64 = await screenshot();
  const image = new Image();
  image.src = SVGBase64;

  image.onload = () => {
    const PNGBase64 = imageToPngBase64(image, 2);
    download("image.png", PNGBase64);
  };
};

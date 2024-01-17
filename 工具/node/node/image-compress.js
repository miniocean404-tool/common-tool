import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import imageminPngquant from "imagemin-pngquant";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminGifsicle from "imagemin-gifsicle";
import imageminOptipng from "imagemin-optipng";
import imageminSvgo from "imagemin-svgo";

const path = "./image/**";
const output = "./build";
const ext = "*.{jpg,jpeg,png,gif,svg}";

const compressAll = async () => {
  const files = await imagemin([`${path}/${ext}`], {
    destination: output,
    plugins: [
      imageminMozjpeg({
        quality: 70,
      }),
      imageminOptipng({ optimizationLevel: 7 }),
      imageminPngquant({ quality: [0.65, 0.8] }),
      imageminWebp({
        quality: 85,
      }),
      imageminSvgo(),
      imageminGifsicle(),
    ],
  });

  return files;
};

await compressAll();

export function getPixelPrimaryColor(pixels: Uint8ClampedArray): PrimaryColorInfo {
  const colorsCount: { [key: string]: number } = {};

  for (let i = 0; i < pixels.length / 4; i++) {
    const group = i * 4;

    if (pixels[group]) {
      const r = pixels[group];
      const g = pixels[group + 1];
      const b = pixels[group + 2];
      const a = pixels[group + 3];

      const color = `${r},${g},${b},${a}`;

      if (colorsCount[color]) ++colorsCount[color];
      else colorsCount[color] = 1;
    }
  }

  let maxCount = Math.max(...Object.values(colorsCount));
  let maxColor = Object.keys(colorsCount).filter((key) => colorsCount[key] === maxCount)[0];

  console.log(`主要颜色: %c rgba(${maxColor})`, `background: rgba(${maxColor})`);

  return {
    color: maxColor,
    count: maxCount,
  };
}

import confetti from "canvas-confetti"

const pc = {
  origin: {
    // 发射的水平方向原点，0 表示左边缘，1 表示右边缘。
    x: 0.5,
    // 发射的垂直方向原点，0 表示上边缘，1 表示下边缘。
    y: 0.5,
  },
  // 要发射的五彩纸屑的数量。
  particleCount: 500,
  // 五彩纸屑喷射时候的速度，以像素为单位。 默认值：45 默认 45
  startVelocity: 120,
  // 五彩纸屑在垂直方向扩散的角度，45 表示五彩纸屑以 Y 轴正方向 22.5 度角发射。
  spread: 120,
  // 值越小粒子消失得越快，值越大粒子消失得越慢 默认 200
  ticks: 700,
}

const phone = {
  origin: {
    // 发射的水平方向原点，0 表示左边缘，1 表示右边缘。
    x: 0.5,
    // 发射的垂直方向原点，0 表示上边缘，1 表示下边缘。
    y: 0.9,
  },
  // 要发射的五彩纸屑的数量。
  particleCount: 300,
  // 五彩纸屑喷射时候的速度，以像素为单位。 默认值：45 默认 45
  startVelocity: 100,
  // 五彩纸屑在垂直方向扩散的角度，45 表示五彩纸屑以 Y 轴正方向 22.5 度角发射。
  spread: 70,
  // 值越小粒子消失得越快，值越大粒子消失得越慢 默认 200
  ticks: 500,
}

const common = {
  // 发射的角度，0 表示水平向右；90 表示垂直向上；180 表示水平向左；270 表示垂直向下。
  angle: 90,

  // 粒子下落的速度。1 是全重力，0.5 是半重力，0 表示无重力；大于 1 表示加速下落，负值表示粒子会向上升起。 默认：1
  gravity: 1,
  // 缩放纸屑的大小
  scalar: 1,
  // 纸屑的飘落方向，左边用负数，右边用正数
  drift: 0,
  // 当设置了 prefer reduced motion 媒体查询时完全禁用五彩纸屑。当设置为 true 时，使用此 confetti 函数实例将始终接受用户减少页面动效的请求并为他们禁用五彩纸屑。
  // prefer reduced motion: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
  disableForReducedMotion: false,

  // 颜色字符串数组，采用 HEX 格式（# + 3 位或 6 位十六进制数字），可以重复颜色来增加比例，
  // 例如 ['#f00', '#f00', '#f00', '#f00', '#0f0', '#00f', '#ff0'] 表示红色占七分之四，绿色、蓝色、黄色各占七分之一比例
  // colors: ["#f00", "#f00", "#f00", "#f00", "#0f0", "#00f", "#ff0"],
  // 五彩纸屑的形状数组，可以为 square 和 circle。默认设置是均匀混合使用这两种形状。
  // ['circle', 'circle', 'square'] 表示使用三分之二的圆圈和三分之一的正方形
  // shapes: ["circle", "circle", "square"],
}

confetti({ ...common, ...pc })

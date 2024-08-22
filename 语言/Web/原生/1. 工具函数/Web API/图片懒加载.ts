export const imageLazy = (select: string, root?: string) => {
  const observer = new IntersectionObserver(callback, {
    // 设置观察目标的父元素或者爷爷辈元素，也就是视口元素
    // 不设置默认为浏览器可见窗口
    root: root ? document.querySelector(`${root}`) : null,
    // 将观察的视口元素的 范围的 上下左右扩大多少
    rootMargin: "0px", // 根元素的边距
    // 设置目标元素与视口元素触发的百分比，0 就是刚接进入触发，1 是完全进入视口才触发
    // 进入离开时候都会触发，所以可以设置 observer.unobserve
    threshold: 1,
  });

  // 选择对应元素下包含 data-src 属性的元素
  const images = document.querySelectorAll(`${select}[data-src]`);
  images.forEach((ele) => observer.observe(ele));
};

function callback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
  entries.forEach((entry) => {
    // entry.isIntersecting 是否交叉
    // 如果 entry.intersectionRatio 为 0，则目标在视野外，
    if (entry.intersectionRatio <= 0) return;
    const img = entry.target as HTMLImageElement;
    const src = img.getAttribute("data-src");

    img.setAttribute("src", src ?? ""); // 将真实的图片地址赋给 src 属性
    img.onload = () => {
      // 添加动画
      img.setAttribute("class", "fade-in");
    };

    observer.unobserve(img);
  });
}

/* 定义淡入动画 */
// @keyframes fadeIn {
//     from {
//       opacity: 0;
//     }
//     to {
//       opacity: 1;
//     }
//   }

//   /* 应用淡入动画到元素 */
//   .fade-in {
//     animation: fadeIn 0.6s ease-in;
// }

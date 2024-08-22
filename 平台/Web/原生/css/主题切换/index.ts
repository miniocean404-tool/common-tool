// 设置主题
window.document.documentElement.setAttribute("data-theme", "default");

// View Transition API
function toggleTheme(event: MouseEvent) {
  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];

  const isDark: boolean = document.documentElement.classList.contains("dark");

  // 使用document.startViewTransition，并传入更新DOM的方法，使浏览器记录两次状态时DOM的快照，即::view-transition-old(root)和::view-transition-new(root)：
  // @ts-ignore
  const transition = document.startViewTransition(() => {
    const doc = document.documentElement;
    doc.classList.remove(isDark ? "dark" : "light");
    doc.classList.add(isDark ? "light" : "dark");
  });

  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: isDark ? [...clipPath].reverse() : clipPath,
      },
      {
        delay: 0,
        endDelay: 0,
        duration: 500,
        easing: "ease-in-out",
        // pseudoElement 将动画效果定在伪元素上
        pseudoElement: isDark ? "::view-transition-old(root)" : "::view-transition-new(root)",
      },
    );
  });
}

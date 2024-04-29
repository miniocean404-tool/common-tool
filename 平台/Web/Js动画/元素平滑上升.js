const defaultOptions = {
  distant: 100,
  duration: 500,
};

const map = new Map();

const getIntersectionObserver = () => {
  if (ob) return ob;

  ob = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const { target, isIntersecting } = entry;

        if (isIntersecting) {
          const animation = map.get(target);
          animation.play();

          ob.unobserve(target);
        }
      }
    },
    // 元素身体暴露在视口中百分之多少时候视为 isIntersecting
    { threshold: 0.0 },
  );
  return ob;
};

export function elementRiseSmoothly(options) {
  options = { ...defaultOptions, ...options };

  const { el, distant, duration } = options;
  if (!isExistViewport(el)) return;

  getIntersectionObserver();

  const animation = el.animate(
    [
      { transform: `translateY(${distant}px)`, opacity: 0.5 },
      { transform: `translateY(0)`, opacity: 1 },
    ],
    { duration: duration, easing: "ease-out", fill: "forwards" },
  );
  animation.pause();

  ob.observe(el);
  map.set(el, animation);
}

function isExistViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top > window.innerHeight;
}

const map = new Map();

let ob;
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
    { threshold: 0.0 },
  );
  return ob;
};

export function elementRiseSmoothly(options) {
  options = { ...{ distant: 100, duration: 500 }, ...options };

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

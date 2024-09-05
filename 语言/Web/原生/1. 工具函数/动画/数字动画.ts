function animationNum(
  from: number,
  to: number,
  duration: number = 1000,
  onUpdate: (num: number) => void,
  onComplete: () => void,
) {
  let start = Date.now()
  let speed = (to - from) / duration

  let _run = () => {
    const t = Date.now() - start

    if (t >= duration) {
      onUpdate(to)
      onComplete()
      return
    }

    const value = from + speed * t
    onUpdate(value)
  }

  _run()
}

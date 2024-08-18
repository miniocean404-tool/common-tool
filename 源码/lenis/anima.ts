import { clamp, damp } from "./utils"

export class Animate {
  isRunning: boolean = false
  // 动画下一次执行的位置
  value: number = 0
  from: number = 0
  to: number = 0
  lerp?: number
  duration?: number = 0
  easing?: Function
  currentTime: number = 0
  onUpdate?: Function

  // 根据屏幕刷新时间及动画函数计算下一次动画的值
  advance(deltaTime: number) {
    if (!this.isRunning) return

    let completed = false

    if (this.duration && this.easing) {
      this.currentTime += deltaTime

      const linearProgress = clamp(0, this.currentTime / this.duration, 1)

      completed = linearProgress >= 1
      const easedProgress = completed ? 1 : this.easing(linearProgress)
      this.value = this.from + (this.to - this.from) * easedProgress
    } else if (this.lerp) {
      this.value = damp(this.value, this.to, this.lerp * 60, deltaTime)
      if (Math.round(this.value) === this.to) {
        this.value = this.to
        completed = true
      }
    } else {
      // 如果没有 easing 或 lerp，则直接跳到最终值
      this.value = this.to
      completed = true
    }

    if (completed) {
      this.stop()
    }

    // 回调动画是否完成及动画当前的值
    this.onUpdate?.(this.value, completed)
  }

  stop() {
    this.isRunning = false
  }

  // 设置动画从起始值到结束值
  // 带有可选参数用于帮助、持续时间、easing 和 onUpdate 回调
  fromTo(
    from: number,
    to: number,
    {
      lerp,
      duration,
      easing,
      onStart,
      onUpdate,
    }: {
      lerp?: number
      duration?: number
      easing?: Function
      onStart?: Function
      onUpdate?: Function
    },
  ) {
    this.from = this.value = from
    this.to = to
    this.lerp = lerp
    this.duration = duration
    this.easing = easing
    this.currentTime = 0
    this.isRunning = true

    onStart?.()
    this.onUpdate = onUpdate
  }
}

import { Animate } from "./anima"
import { clamp } from "./utils"

interface SilkyOption {
  wrapper?: Window | HTMLElement
  lerp?: number
  duration?: number

  // 缓动函数
  easing?: (t: number) => number
}

// lenis 滚动辅助动画源码 简化版
// 需要为 wrapper 滚动容器添加 css 属性 scroll-behavior: auto 代表立即更新滚动位置
export default class Silky {
  requestAnimationFrameLastTime = 0 // 回调时间记录
  animatedScroll = 0 // 动画滚动位置
  targetScroll = (this.animatedScroll = this.actualScroll) // 目标滚动位置

  options: SilkyOption = {}

  animate: Animate = new Animate()

  constructor({
    wrapper = window,
    lerp = 0.0,
    duration = 1,
    easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  }: SilkyOption = {}) {
    this.options.lerp = lerp
    this.options.wrapper = wrapper
    this.options.duration = duration

    this.options = {
      lerp,
      wrapper,
      duration,
      easing,
    }

    this.root.addEventListener(
      "wheel",
      (e: Event) => {
        e.preventDefault() // 阻止默认事件，停止滚动
        if (e instanceof WheelEvent) this.onVirtualScroll(e)
      },
      { passive: false },
    )
  }

  onVirtualScroll(e: WheelEvent) {
    const target = this.getNextScrollPosition(e)

    // 防止多次滚动时，this.targetScroll 赋值完成后，第二次在第一次的 targetScroll 值时已经走到这里，而导致的动画目标位置计算重复
    if (target === this.targetScroll) return

    // 设置下一次动画的起始位置，方便计算下下一次的滚动位置
    this.targetScroll = target

    // 多次滚动 animatedScroll 仍然是动画进行的当前位置，而目标位置通过 this.targetScroll = target 已经更新
    this.animate.fromTo(this.animatedScroll, target, {
      ...this.options,
      onStart: () => {},
      onUpdate: (value: number, completed: boolean) => {
        this.animatedScroll = value
        this.root.scrollTop = this.animatedScroll

        if (completed) {
          this.reset()
        }
      },
    })
  }

  getNextScrollPosition(e: WheelEvent): number {
    // e.deltaY Y 滚轮的纵向滚动量
    let target = Math.round(this.targetScroll + e.deltaY)
    // 计算目标滚动位置（并且在合理范围内，否则会导致 animatedScroll 超出）
    return clamp(0, target, this.root.scrollHeight - this.root.clientHeight)
  }

  // DOMHighResTimeStamp 上一帧渲染的结束时间(毫秒)
  raf(time: DOMHighResTimeStamp) {
    const gapTime = time - (this.requestAnimationFrameLastTime || time)
    this.requestAnimationFrameLastTime = time
    this.animate.advance(gapTime * 0.001)
  }

  reset() {
    this.animatedScroll = this.targetScroll = this.actualScroll
    this.animate.stop()
  }

  get actualScroll(): number {
    return this.root?.scrollTop
  }

  // 滚动的元素
  get root(): HTMLElement {
    return !this.options?.wrapper || this.options.wrapper === window
      ? document.documentElement
      : (this.options.wrapper as HTMLElement)
  }
}

import { SVG, Svg, Gradient, Line, G, Timeline } from "@svgdotjs/svg.js"

/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */

export class PolylineSVG {
  /**
   * @type {Element}
   */
  #root = null
  /**
   * @type {Element[]}
   */
  #logos = []
  #rootWidth = 0
  #rootHeight = 0

  /**
   * @type {number[]}
   */
  points = []

  /**
   * @type {Svg}
   */
  #svg = null

  /**
   * @type {Gradient}
   */
  #defsLinearGradient = null

  /**
   * @param {Element} root
   * @param {Element[]} logos
   */
  constructor(root, logos) {
    this.#logos = logos
    this.#root = root
  }

  create() {
    this.createSVG()
    this.createLinearGradient()

    this.createLine(this.points)
  }

  createSVG() {
    this.#svg = SVG().addClass("svg-line").addTo(this.#root)

    this.getPoint()
    this.updateSvgSize()
  }

  updateSVGLine() {
    this.getPoint()
    this.updateSvgSize()

    this.#svg.children().each((element) => {
      if (element.type === "polyline") {
        element.plot(this.points)
      }
    })
  }

  updateSvgSize() {
    this.#rootWidth = this.#root.clientWidth
    this.#rootHeight = this.#root.clientHeight
    this.#svg.viewbox(0, 0, this.#rootWidth, this.#rootHeight).width(this.#rootWidth).height(this.#rootHeight)
  }

  getPoint() {
    this.points = this.#logos
      .map((logo) => {
        const point = getElementPoint(logo)
        return [point.x, point.y]
      })
      .flat()
  }

  /**
   * @param {number[]} points
   */
  createLine(points) {
    // 光线
    this.#svg
      .polyline()
      .plot(points)
      .fill("none")
      .stroke({ color: this.#defsLinearGradient.url(), width: 4, linecap: "round", linejoin: "round" })
    this.#svg.polyline().plot(points).fill("none").stroke({ color: "black", width: 3, opacity: 0.1, linecap: "round" })
  }

  createLinearGradient(start = "#9c40ff", end = "#ffaa40") {
    this.#defsLinearGradient = this.#svg
      .defs()
      .gradient("linear", (add) => {
        add.stop({ color: start, opacity: 0 })
        add.stop({ color: start, offset: "67.5%" })
        add.stop({ color: end, offset: "100%" })
        add.stop({ color: end, offset: "100%", opacity: 0 })
      })
      .attr("gradientUnits", "userSpaceOnUse")
      .stroke({ linecap: "round", linejoin: "round" })
      .id("color")
      .from(`50%`, `0%`)
      .to(`50%`, `8%`)

    // this.#defsLinearGradient.animate(6000, 0, "now").from(`50%`, `100%`).loop()
    // this.#defsLinearGradient.animate(6000, 0, "now").to(`50%`, `108%`).loop()
  }
}

/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 *
 * @param {Element} element
 * @return {Point}
 */
export function getElementPoint(element) {
  const x = element.offsetLeft + element.clientWidth / 2
  const y = element.offsetTop + element.clientHeight / 2

  return { x, y }
}

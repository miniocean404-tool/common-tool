interface LogColorConfig {
  label?: string
  color?: string
  fontSize?: number
  fontWeight?: "bolder" | "bold" | "normal"
}

export function log_color(config?: LogColorConfig, ...message: any[]): void {
  const { label, color = "#43bb88", fontSize = 12, fontWeight = "bold" } = config || {}
  console.log(`%c ${label}:`, `color: ${color};font-size: ${fontSize}px;font-weight: ${fontWeight}`, ...message)
}

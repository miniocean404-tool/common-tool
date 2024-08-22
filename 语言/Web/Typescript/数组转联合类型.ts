// readonly ["1", "2", "3", 4]
const values = ["1", "2", "3", 4] as const
type Values = (typeof values)[number]

const tip: Values = "1"

import type { PropsWithChildren } from "react"

interface AddressIcon {
  fill: string
}

export default function ManualAddressIcon({ fill = "#A88A8A" }: PropsWithChildren<AddressIcon>) {
  return (
    <svg width='13' height='13' viewBox='0 0 13 13' fill='none' xmlns='http://www.w3.org/2000/svg' style={{ fill }}>
      <animate attributeName='fill' dur={`2000ms`} fill='freeze' from={"red"} to={fill}></animate>

      <g clipPath='url(#clip0_15439_17511)'>
        <path d='M6.99929 0.5C4.51429 0.5 2.5 2.45539 2.5 4.86548C2.5 8.10363 5.26347 11.1239 6.45932 12.2788C6.7604 12.5708 7.24666 12.5737 7.5534 12.2875C8.75632 11.166 11.5 8.23874 11.5 4.86548C11.4986 2.45539 9.48429 0.5 6.99929 0.5ZM6.99929 6.32693C6.19499 6.32693 5.54193 5.65577 5.54193 4.82916C5.54193 4.00255 6.19499 3.33139 6.99929 3.33139C7.8036 3.33139 8.45665 4.00255 8.45665 4.82916C8.45665 5.65577 7.8036 6.32693 6.99929 6.32693Z' />
      </g>
      <defs>
        <clipPath id='clip0_15439_17511'>
          <rect width='13' height='13' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}

import * as React from 'react'
import { SVGProps } from 'react'
const DownloadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={17}
    height={17}
    fill='none'
    {...props}
  >
    <path
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M14.875 10.625v2.833a1.417 1.417 0 0 1-1.417 1.417H3.542a1.417 1.417 0 0 1-1.417-1.417v-2.833M4.958 7.083 8.5 10.625l3.542-3.542M8.5 10.625v-8.5'
    />
  </svg>
)
export default DownloadIcon

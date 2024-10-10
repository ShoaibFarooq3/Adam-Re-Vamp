import React from 'react'

type Props = {
  open: boolean
  onClick: () => void
}

const ToggleButton = ({ open, ...props }: Props) => {
  return (
    <button
      className={`absolute top-6 left-6 w-6 z-[60] md:hidden ${
        open && '!w-5 !top-4 !left-4'
      }`}
      {...props}
    >
      <div
        className={`bg-[#ff2d92] h-1 w-full rounded duration-150 ease-in-out ${
          open && 'rotate-45 mt-1'
        }`}
      />
      <div
        className={`bg-[#ff2d92] h-1 w-full rounded my-1 duration-150 ease-in-out ${
          open && '-rotate-45 m-0 -mt-1'
        }`}
      />
      <div
        className={`bg-[#ff2d92] h-1 w-full rounded duration-150 ease-in-out ${
          open && 'hidden'
        }`}
      />
    </button>
  )
}

export default ToggleButton

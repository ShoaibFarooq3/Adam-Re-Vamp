import React from 'react'

type Props = {
  show: boolean
}

const Backdrop = ({ show }: Props) => {
  return (
    <div
      className={`absolute top-0 left-0 h-full w-full bg-black bg-opacity-70 z-40 duration-300 ease-in-out md:hidden ${
        !show && 'max-md:hidden'
      }`}
    />
  )
}

export default Backdrop

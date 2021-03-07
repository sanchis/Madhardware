import * as React from 'react'
import Image from 'next/image'

interface LogoProps {
  width: string
  height: string
  props?: any
}

export function Logo ({ width, height, ...props }: LogoProps): JSX.Element {
  return (
    <Image width={width} src='/logo-s.png' height={height} alt='madHardware logo' {...props} />
  )
}

import Image from 'next/image'

export function Logo ({ width, height, ...props }) {
  return (
    <Image width={width} src='/logo-s.png' height={height} alt='madHardware logo' {...props} />
  )
}

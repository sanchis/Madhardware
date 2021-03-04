import React from 'react'
import { useRouter } from 'next/router'
import { PccomponentesCard } from 'components/product/card/pcc'

export default function SearchResult (): JSX.Element {
  const router = useRouter()

  console.log(router.query)
  return (
    <>
      <h2>Search result</h2>
      <PccomponentesCard />
    </>
  )
}

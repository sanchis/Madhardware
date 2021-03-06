import React from 'react'
import { PccomponentesCard } from 'components/product/card/pcc'
import { searchPcc } from 'services/parser.service'

export default function SearchResult ({ pcc }) {
  return (
    <>
      <h2>Search result</h2>
      {pcc ? <PccomponentesCard product={pcc} /> : <p>Prodducto no encontrado</p>}
    </>
  )
}

export async function getServerSideProps ({ query }) {
  const text = query.text
  if (!text || text.trim() === '') {
    return {
      props: {
        pcc: null
      }
    }
  }

  return {
    props: {
      pcc: await searchPcc(text)
    } // will be passed to the page component as props
  }
}

import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Input } from '@chakra-ui/react'

export default function Home () {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    router.push(`search/${encodeURIComponent(keyword)}`)
  }
  return (
    <>
      <Head>
        <title>Home - MadHardware</title>
      </Head>
      <form onSubmit={handleSubmit}>

        <Input
          type='text'
          lg='lg' name='keyword'
          textAlign='center'
          placeholder='Introduce el nombre del producto'
          required onChange={(event) => setKeyword(event.target.value)}
          value={keyword}
        />
      </form>
    </>
  )
}

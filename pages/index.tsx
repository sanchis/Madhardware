import { useState } from 'react'
import Head from 'next/head'
import styles from 'styles/index.module.css'
import { useRouter } from 'next/router'

export default function Home () {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    router.push(`search/${keyword}`)
  }
  return (
    <>
      <Head>
        <title>Home - MadHardware</title>
      </Head>
      <form onSubmit={handleSubmit}>

        <input type='text' className={`margin-auto ${styles.search}`} name='keyword' placeholder='Introduce tu producto' required onChange={(event) => setKeyword(event.target.value)} value={keyword} />
      </form>
    </>
  )
}

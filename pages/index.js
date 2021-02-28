import { useState } from 'react'
import Head from 'next/head'
import styles from 'styles/index.module.css'

export default function Home () {
  const [keyword, setKeyword] = useState('')

  return (
    <>
      <Head>
        <title>Home - MadHardware</title>
      </Head>
      <input type='text' className={`margin-auto ${styles.search}`} name='keyword' placeholder='Introduce tu producto' required onChange={(event) => setKeyword(event.target.value)} value={keyword} />
    </>
  )
}

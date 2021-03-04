
import Loading from 'components/Loading'
import React from 'react'
import styles from './pcc-card.module.css'

export function PccomponentesCard (): JSX.Element {
  return (
    <>
      <h2>Pccomponentes</h2>
      <div className={styles.productCard}>
        <div className={styles.productLoading}>
          <Loading />
        </div>
      </div>
    </>
  )
}

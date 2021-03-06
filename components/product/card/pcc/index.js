
import React from 'react'
import styles from './pcc-card.module.css'

export function PccomponentesCard ({ product }) {
  return (
    <>
      <h2>Pccomponentes</h2>
      <div className={styles.productCard}>

        <div className={styles.image}>
          <img src={product.image} />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{product.name}</h3>
          <p className={styles.body}>
            {product.description}
          </p>
        </div>
        <div className={styles.price}>
          <h1>{product.price} €</h1>
          {/* TODO generate link to shop */}
        </div>
      </div>
    </>
  )
}


import React from 'react'
import styles from './pcc-card.module.css'
import Image from 'next/image'

export function PccomponentesCard ({ product }) {
  return (
    <>
      <div className={styles.productCard}>
        <div className={styles.img}>
          <Image width='300' height='300' src={product.image} />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{product.name}</h3>
          <p className={styles.body}>
            {product.description}
            {/* TODO create acordion   */}
          </p>
        </div>
        <div className={styles.price}>
          <h1>{product.price} €</h1>
          <a className={styles.url} href={product.url} target='_blank' rel='noopener noreferrer'>Ver producto</a>
        </div>
      </div>
    </>
  )
}

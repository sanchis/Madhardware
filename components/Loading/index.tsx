import React from 'react'
import styles from './loading.module.css'

export default function Loading (): JSX.Element {
  return (
    <div className={styles.ldsEllipsis}><div /><div /><div /><div /></div>
  )
}

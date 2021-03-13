import styles from './spinner.module.css'
import useLoading from 'hooks/useLoading'

export default function Spinner () {
  const [loading] = useLoading()

  return (loading > 0
    ? (
      <>
        <div className={styles.overlay} />
        <div className={styles.SkfoldingCube}>
          <div className={`${styles.Skcube1} ${styles.Skcube}`} />
          <div className={`${styles.Skcube2} ${styles.Skcube}`} />
          <div className={`${styles.Skcube4} ${styles.Skcube}`} />
          <div className={`${styles.Skcube3} ${styles.Skcube}`} />
        </div>
      </>
      )
    : null)
}

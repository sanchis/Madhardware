import styles from './spinner.module.css'
import { useColorModeValue } from '@chakra-ui/react'

export default function Spinner ({ loading }) {
  const bgColor = useColorModeValue('blackAlpha-600', 'whiteAlpha-400') // dark //white

  return (loading > 0
    ? (
      <>
        <div
          className={styles.overlay} style={{
            backgroundColor: `var(--chakra-colors-${bgColor})`
          }}
        />
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

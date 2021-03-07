import { Logo } from 'components/Logo'
import styles from './app-layout.module.css'

export function AppLayaout ({ children }): JSX.Element {
  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.containerLogo} text-center`}>
          <Logo width='250' height='210' />
        </div>
        <main>
          {children}
        </main>
      </div>

      <footer />
    </>
  )
}

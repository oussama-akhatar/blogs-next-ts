import React from 'react'
import styles from './page.module.scss'

const Layout = ({children} : {children: React.ReactNode}) => {
  return (
    <div>
        <h1 className={styles.mainTitle}>Our Works</h1>
        {children}
    </div>
  )
}

export default Layout
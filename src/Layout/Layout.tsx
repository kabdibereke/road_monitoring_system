
import Header from './Header/Header'
import styles from './Layout.module.scss'
type LayoutProps = {
    children:React.ReactNode
}

const Layout = ({children}: LayoutProps) => {
  return (
    <>
        <Header/>
        <div className={styles.container}>
            {children}
        </div>
    </>
  )
}

export default Layout
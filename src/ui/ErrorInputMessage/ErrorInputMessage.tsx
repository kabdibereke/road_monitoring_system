import React from 'react'
import styles from './ErrorInputMessage.module.scss'
type ErrorInputMessageProps = {
    children:React.ReactNode
}

const ErrorInputMessage = ({children}: ErrorInputMessageProps) => {
  return (
    <p className={styles.title}>
        {children}
    </p>
  )
}

export default ErrorInputMessage
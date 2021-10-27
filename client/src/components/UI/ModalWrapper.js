import styles from './ModalWrapper.module.css'
import ReactDOM from 'react-dom'
import { Fragment } from 'react'

const ModalWrapper = ({ children }) => {


    return ReactDOM.createPortal(
        <Fragment>
                <div className={styles.backdrop}></div>
                <div className={styles.wrapper}>
                    {children}
                </div>
            </Fragment>, document.getElementById('modal')
            )              
}

export default ModalWrapper
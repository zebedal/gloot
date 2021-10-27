import { Fragment } from 'react'
import ReactDOM from 'react-dom'
import styles from './BackdropLoader.module.css'
import Loader from './Loader'

const Backdrop = ({ children }) => (
    ReactDOM.createPortal(
        <div className={styles.Backdrop}>
            <Loader text="Loading awesome stuff.." />
        </div>
        , document.getElementById('backdrop')
    )

)

export default Backdrop
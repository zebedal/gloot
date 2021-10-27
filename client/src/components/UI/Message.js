import styles from './Message.module.css'
import ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'

const Message = ({ type , text, setShow, show }) => {

console.log(type)
    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 3000)
    }, [])

    return (
        ReactDOM.createPortal(<div className={`${styles.Message} ${type === "success" ? styles.Success : styles.Error}`} style={{display: show ? 'block' : 'none'}}>
            {text}
        </div>, document.getElementById('message'))
    )
}



export default Message
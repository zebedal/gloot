import styles from './Button.module.css'
import { MdSave } from "react-icons/md";


const Button = ({ text, marginTop, click, background = true, disabled }) => {

    if (!background) {
        return <div className={`${styles.Button} ${styles.nobg}`} style={{ marginTop: `${marginTop}px` }} onClick={click}>{text}</div>
    }

    return <div className={styles.Button} style={{ marginTop: `${marginTop}px`, pointerEvents: disabled ? 'none' : 'all', background: disabled ? 'grey' : "" }} onClick={click}>{text}
        <MdSave />
    </div>

}

export default Button
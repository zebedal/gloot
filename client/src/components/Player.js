import styles from './Player.module.css'
import {MdDeleteForever} from 'react-icons/md'

const Player = ({ name, img }) => (
    <div className={styles.Wrapper}>
        <div className={styles.Player}>
            <div className={styles.ImgWrapper}>
                <img src={`/assets/img/${img}`} alt="player"></img>
            </div>
            <div className={styles.Content}>
                {name}
            </div>
            <div className={styles.Actions}>
                <MdDeleteForever style={{fontSize:'28px'}}/>
            </div>
        </div>
    </div>
)

export default Player
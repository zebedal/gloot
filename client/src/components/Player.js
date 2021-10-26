import styles from './Player.module.css'
import { MdDeleteForever, MdEditNote } from 'react-icons/md'
import { SiTeamspeak } from "react-icons/si";
import ReactCountryFlag from "react-country-flag"

const Player = ({ name, country, img, age, team }) => (
    <div className={styles.Wrapper}>
        <div className={styles.Player}>
            <div className={styles.ImgWrapper}>
                <img src={`/assets/img/${img}`} alt="player"></img>
            </div>
            <div className={styles.Content}>
                <div>
                    <p className={styles.Name}>{name}&nbsp;<ReactCountryFlag countryCode={country} svg
                        style={{
                            width: '20px',
                            height: 'auto',
                        }} /></p>
                    <p className={styles.Age}>Age:&nbsp;{age}</p>
                </div>
                <div>
                    <SiTeamspeak style={{ fontSize: '30px' }} />
                    <p>{team}</p>
                </div>
            </div>
            <div className={styles.Actions}>
                <div>
                    <MdDeleteForever />
                    <MdEditNote />
                </div>
            </div>
        </div>
    </div>
)

export default Player
import styles from './Header.module.css'
import { GiOpenTreasureChest } from "react-icons/gi";

const Header = () => (
    <header className={styles.Header}>
        <div className={`container ${styles.FlexContainer}`}>
            <div className={styles.Logo}>
                <GiOpenTreasureChest style={{ color: 'var(--red)', fontSize:'34px' }} />
                <span>GLOOT</span>
            </div>
        </div>
    </header>
)

export default Header
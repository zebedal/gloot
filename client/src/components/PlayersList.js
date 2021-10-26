import {useEffect, useState} from 'react'
import styles from './PlayersList.module.css'
import Player from './Player'
import Loader from './UI/Loader'

const PlayersList = props => {

    const [playersList, setPlayersList] = useState(null)

    useEffect(() => {
        (async() => {
            const result = await fetch('http://localhost:3000/players')
            const data = await result.json()
            setPlayersList(data)  
        })();
    }, [])

    if(!playersList) return <Loader />

    return (
        <section className={styles.Section}>
            <div className="container">
                <h1><span className={styles.Mix}>Players</span> List</h1>
            </div>
            <div className={`container ${styles.PlayersWrapper}`}>
                {playersList.map(player => <Player 
                key={player.id} 
                name={player.name}
                country={player.countryCode}
                age={player.age} 
                team={player.team} 
                img={player.imgName} />)}
            </div>
        </section>
    )
}

export default PlayersList
import {useEffect, useState} from 'react'
import styles from './PlayersList.module.css'
import Player from './Player'
import Loader from './UI/Loader'

const PlayersList = props => {

    const [playersList, setPlayersList] = useState(null)
    const [selectedPlayer, setSelectedPlayer] = useState(null)
    

    useEffect(() => {
        (async() => {
            const result = await fetch('http://localhost:3000/players')
            const data = await result.json()
            setPlayersList(data)  
        })();
    }, [])


    const editPlayerHandler = playerId => {
        if(selectedPlayer) {
            setSelectedPlayer(null)
            return
        }
        const selected = playersList.find(el => el.id === playerId)
        setSelectedPlayer(selected)
    }

    const updatePlayer = async obj => {
        const result = await fetch(`http://localhost:3000/player/${obj.id}`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(obj)
        })
        const data = await result.json()
        console.log(data)
    }

    if(!playersList) return <div className="container"><Loader text="Loading players list..." /></div>

    return (
        <section className={styles.Section}>
            <div className="container">
                <h1><span className={styles.Mix}>Players</span> List</h1>
            </div>
            <div className={`container ${styles.PlayersWrapper}`}>
                {!selectedPlayer && playersList.map(player => <Player 
                key={player.id}
                id={player.id} 
                name={player.name}
                countryCode={player.countryCode}
                age={player.age} 
                team={player.team} 
                imgName={player.imgName}
                handlePlayer={editPlayerHandler}
                />)}
                {selectedPlayer && <Player {...selectedPlayer}  handlePlayer={editPlayerHandler} update={updatePlayer} selected/>}
            </div>
        </section>
    )
}

export default PlayersList
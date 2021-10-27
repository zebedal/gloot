import { useEffect, useState } from 'react'
import styles from './PlayersList.module.css'
import Player from './Player'
import BackdropLoader from './UI/BackdropLoader'
import Message from '../components/UI/Message'

const PlayersList = props => {


    const [playersList, setPlayersList] = useState(null)
    const [selectedPlayer, setSelectedPlayer] = useState(null)
    const [loadingData, setLoadingData] = useState(true)
    const [showMessage, setShowMessage] = useState({ show: false, text: "", status: "" })

    useEffect(() => {
        (async () => {
            const result = await fetch('http://localhost:3000/players')
            const data = await result.json()
            setPlayersList(data)
            setLoadingData(false)
        })();
    }, [])


    //handles the selected player event and shows the update form
    const editPlayerHandler = playerId => {
        if (selectedPlayer) {
            setSelectedPlayer(null)
            return
        }
        const selected = playersList.find(el => el.id === playerId)
        setSelectedPlayer(selected)
    }

    //updates the player information once the form is submitted
    const updatePlayer = async obj => {
        setLoadingData(true)
        try {
            const result = await fetch(`http://localhost:3000/player/${obj.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
            const data = await result.json()
            //updates the state with the new player information
            const updatedPlayerList = playersList.map(player => player.id === data.id ? { ...player, name: data.name, age: data.age, team: data.team } : player)
            setPlayersList(updatedPlayerList)
            setSelectedPlayer(null)
            setLoadingData(false)
            setShowMessage({ show: true, text: `Player updated successfully`, status: "success" })
        } catch (error) {
            setLoadingData(false)
            setShowMessage({ show: true, text: `An error has occurred, ${error}`, status: "error" })
        }


    }

    const deletePlayer = async id => {
        setLoadingData(true)
        try {
            const result = await fetch(`http://localhost:3000/player/${id}`);
            const data = await result.json()
            const filtered = playersList.filter(player => player.id !== data.id)
            setPlayersList(filtered)
            setLoadingData(false)
            setShowMessage({ show: true, text: `Player deleted successfully`, status: "success" })
        } catch (error) {
            setLoadingData(false)
            setShowMessage({ show: true, text: `An error has occurred, ${error}`, status: "error" })
        }
    }

    if (!playersList) return <BackdropLoader />

    return (
        <section className={styles.Section}>
            <div className="container">
                <h1><span className={styles.Mix}>Players</span> List</h1>
                <br />
                <p>This is a players list concept for the awesome Gloot assignment. If you hover a player, you can update that player information or delete it using the provided API.</p>
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
                    deletePlayer={deletePlayer}
                />)}
                {selectedPlayer && <Player
                    {...selectedPlayer}
                    handlePlayer={editPlayerHandler}
                    update={updatePlayer}
                    selected
                />}
            </div>
            {loadingData && <BackdropLoader />}
            {showMessage.show && <Message text={showMessage.text} type={showMessage.status} show={showMessage.show} setShow={setShowMessage} />}
        </section>
    )
}

export default PlayersList
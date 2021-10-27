import { useEffect, useState } from 'react'
import styles from './PlayersList.module.css'
import Player from './Player'
import BackdropLoader from './UI/BackdropLoader'
import Message from '../components/UI/Message'
import { BsPlusCircle } from "react-icons/bs";
import ModalWrapper from '../components/UI/ModalWrapper'
import PlayerCreateForm from './PlayerCreateForm'

const PlayersList = props => {

    const [playersList, setPlayersList] = useState([])
    const [selectedPlayer, setSelectedPlayer] = useState(null)
    const [loadingData, setLoadingData] = useState(true)
    const [showMessage, setShowMessage] = useState({ show: false, text: "", status: "" })
    const [showCreateForm, setShowCreateForm] = useState(false)


    useEffect(() => {
        (async () => {
            const result = await fetch('http://localhost:3000/players')
            const data = await result.json()
            setPlayersList(data)
            setLoadingData(false)
        })();
    }, [])


    //handles the selected player and shows the update form
    const editPlayerHandler = playerId => {
        if (selectedPlayer) {
            setSelectedPlayer(null)
            return
        }
        const selected = playersList.find(el => el.id === playerId)
        setSelectedPlayer(selected)
    }

    //updates the player information once the form is submitted
    const updatePlayerHandler = async obj => {
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

    const deletePlayerHandler = async id => {
        setLoadingData(true)
        try {
            const result = await fetch(`http://localhost:3000/player/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await result.json()
            const filtered = playersList.filter(player => player.id !== data.id)
            setPlayersList(filtered)
            setSelectedPlayer(null)
            setLoadingData(false)
            setShowMessage({ show: true, text: `Player deleted successfully`, status: "success" })
        } catch (error) {
            setLoadingData(false)
            setShowMessage({ show: true, text: `An error has occurred, ${error}`, status: "error" })
        }
    }


    const addNewPlayerHandler = async obj => {
        setLoadingData(true)
        obj.imgName = 'new_player.jpg'
        try {
            const result = await fetch(`http://localhost:3000/player`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            const data = await result.json()
            const updatedData = [...playersList, data]
            setPlayersList(updatedData)
            setSelectedPlayer(null)
            setLoadingData(false)
            setShowCreateForm(false)
            setShowMessage({ show: true, text: `Player created successfully`, status: "success" })
        } catch (error) {
            setLoadingData(false)
            setShowMessage({ show: true, text: `An error has occurred, ${error}`, status: "error" })
        }
    }
    
    if (loadingData) return <BackdropLoader />

    return (
        <section className={styles.Section}>
            <div className="container">
                <h1><span className={styles.Mix}>Players</span> List</h1>
                <br />
                <p>This is a players list concept for the awesome Gloot assignment. If you hover a player, you can update that player information or delete it using the provided API. You also have the functionality of creating new players</p>
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
                    deletePlayer={deletePlayerHandler}
                />)}
                {playersList.length === 0 && <p style={{ textAlign: 'center', width: '100%' }}>There are no players available at the moment...</p>}
                {selectedPlayer && <Player
                    {...selectedPlayer}
                    handlePlayer={editPlayerHandler}
                    update={updatePlayerHandler}
                    deletePlayer={deletePlayerHandler}
                    selected
                />}
            </div>
            <div className={`container ${styles.CreatePlayer}`} onClick={() => setShowCreateForm(true)}>
                <span>Create new player</span>
                <BsPlusCircle />
            </div>
            {showMessage.show && <Message text={showMessage.text} type={showMessage.status} show={showMessage.show} setShow={setShowMessage} />}

            {showCreateForm && <ModalWrapper>
                <PlayerCreateForm closeForm={editPlayerHandler} close={() => setShowCreateForm(false)} createPlayer={addNewPlayerHandler} />
            </ModalWrapper>}
        </section>
    )
}

export default PlayersList
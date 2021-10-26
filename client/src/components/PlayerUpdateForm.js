import styles from './PlayerUpdateForm.module.css'
import Button from './UI/Button'
import { MdClose } from "react-icons/md";
import { useRef } from 'react';

const PlayerUpdateForm = ({ name, age, team, closeForm, updatePlayer, id }) => {

    const nameRef = useRef()
    const ageRef = useRef()
    const teamRef = useRef()

    const handleSubmit = () => {
        const obj = {
            id,
            name: nameRef.current.value,
            age: ageRef.current.value,
            team: teamRef.current.value
        }

        updatePlayer(obj)
    }

    return (
        <div className={styles.Wrapper}>
            <header className={styles.Header}>
                <span>Edit player details</span>
                <MdClose onClick={closeForm} />
            </header>
            <br />
            <div className={styles.FormGroup}>
                <input ref={nameRef} type="text" placeholder="Name" defaultValue={name} />
            </div>
            <div className={styles.FormGroup}>
                <input ref={ageRef} type="text" placeholder="Age" defaultValue={age} />
            </div>
            <div className={styles.FormGroup}>
                <input ref={teamRef} type="text" placeholder="Team" defaultValue={team} />
            </div>
            <Button text="Save" marginTop={30} click={handleSubmit} />
        </div>
    )
}



export default PlayerUpdateForm
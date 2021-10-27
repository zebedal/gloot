import styles from './PlayerCreateForm.module.css'
import Button from './UI/Button'
import { MdClose } from "react-icons/md";
import { useRef, useState } from 'react';
import ReactCountryFlag from "react-country-flag"
import { IoChevronDownOutline } from "react-icons/io5";


const dummy_countries = ['FI', 'JP', 'IT', 'BE', 'DK']


const PlayerCreateForm = ({ name, age, team, close, createPlayer }) => {

    const [countryState, setCountryState] = useState(null)
    const [optionsOpened, setOptionsOpened] = useState(false)

    const nameRef = useRef()
    const ageRef = useRef()
    const teamRef = useRef()


    const handleSubmit = () => {
        const obj = {
            name: nameRef.current.value,
            age: ageRef.current.value,
            team: teamRef.current.value,
            country: countryState
        }
        createPlayer(obj)
    }


    const handleSelectedCountry = e => {
        setCountryState(e.target.textContent)
    }

    const showOptionsHandler = () => {
        setOptionsOpened(!optionsOpened)
    }

    return (
        <div className={styles.Wrapper}>
            <header className={styles.Header}>
                <span>Create new player</span>
                <MdClose onClick={close} />
            </header>
            <br />
            <div className={styles.FormGroup}>
                <input ref={nameRef} type="text" placeholder="Name" defaultValue={name} />
            </div>
            <div className={styles.FormGroup}>
                <input ref={ageRef} type="number" placeholder="Age" defaultValue={age} />
            </div>
            <div className={styles.FormGroup}>
                <div className={styles.Select} onClick={showOptionsHandler}>
                    <div>
                        <span>{countryState ? countryState : "Select country:"}</span>
                        <span>{countryState && <ReactCountryFlag countryCode={countryState} svg />}</span>
                    </div>
                    <IoChevronDownOutline style={{color:'white'}}/>
                    {optionsOpened && <div className={styles.SelectOptions}> {dummy_countries.map((country, index) => <p key={index} onClick={handleSelectedCountry} >{country}<ReactCountryFlag countryCode={country} svg /></p>)}</div>}
                </div>
            </div>
            <div className={styles.FormGroup}>
                <input ref={teamRef} type="text" placeholder="Team" defaultValue={team} />
            </div>
            <Button text="Save" marginTop={30} click={handleSubmit} disabled={countryState ? false : true} />
        </div>
    )
}



export default PlayerCreateForm
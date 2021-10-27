import styles from './Player.module.css'
import { MdDeleteForever, MdEditNote } from 'react-icons/md'
import { SiTeamspeak } from "react-icons/si";
import ReactCountryFlag from "react-country-flag"
import PlayerUpdateForm from './PlayerUpdateForm'
import {Fragment } from 'react';

const Player = ({ id, name, countryCode, imgName, age, team, handlePlayer, deletePlayer, selected, update }) => {

    return (
        <Fragment>
            <div className={styles.Wrapper}>
                <div className={styles.Player}>
                    <div className={styles.ImgWrapper}>
                        <img src={`/assets/img/${imgName}`} alt="player"></img>
                    </div>
                    <div className={styles.Content}>
                        <div>
                            <p className={styles.Name}>{name}&nbsp;<ReactCountryFlag countryCode={countryCode} svg
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
                            <MdDeleteForever onClick={() => deletePlayer(id)} />
                            <MdEditNote onClick={() => handlePlayer(id)} />
                        </div>
                    </div>
                </div>
            </div>
            {selected && <PlayerUpdateForm id={id} name={name} age={age} team={team} closeForm={handlePlayer} updatePlayer={update} />}
        </Fragment>
    )
}



export default Player
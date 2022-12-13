import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faBell, faCommentDots } from '@fortawesome/free-regular-svg-icons'
import style from './style.module.scss'

const Header: React.FC = () => {
    return (
        <header>
            <div className={style.navigate}>
                <div className={style.header__buttons}>
                    <button><FontAwesomeIcon icon={faChevronLeft}/></button>
                    <button><FontAwesomeIcon icon={faChevronRight}/></button>
                </div>
                <div className={style.navigate__search}>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    <input type="text" placeholder='Search...' />
                </div>
            </div>
            <div className={style.profile}>
                <div className={style.header__buttons}>
                    <button><FontAwesomeIcon icon={faBell}/></button>
                    <button><FontAwesomeIcon icon={faCommentDots}/></button>
                </div>
                <div className={style.authorized}>
                    <div className={style.avatar}>
                        <div className={style.avatar__inside}>
                            <img src="https://qph.cf2.quoracdn.net/main-qimg-c50da7cfbd08700307b0a98f6f81b66c-lq" alt="authorized__avatar" />
                        </div>
                    </div>
                    <div className={style.authorized__info}>
                        <p className={style.authorized__name}>Maksym F.</p>
                        <p className={style.authorized__level}>7 level</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
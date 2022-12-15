import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/authSlice';

import { HighlightButton } from '../../components'
import style from './style.module.scss'

const Preview: React.FC = () => {
    const dispatch = useAppDispatch()
    
    const authentification = () => {
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider).then(({ user }) => {
            dispatch(login(user))
        })   
    }

    return (
        <div className={style['preview-container']}>
            <div className={style.poster}>
                <img className={style.poster__logo} src={'https://occ-0-256-2568.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABdGwqmU-lBtQYyQ3CA-E4vLyvsiPVSsS46k7zYrJFD44b5fJ3tIbh1YYZjMogrBZZMOa7tVpf_0QE3VAEnQHaHOIKqEtug4myzUft6XuIRfk2l-JF-doSVo9TW0DXJiUOTEnuE-wDY_kQxvsRTqKysccQvgquH6ltXxBo3P6waetuZhjXSu0sg.png?r=095'} alt="" />
                <h1>Watch on <p className={style.logo}>Netflix<span>.</span></p></h1>
                <HighlightButton onClick={authentification}>Login</HighlightButton>
            </div>
        </div>
    )
}

export default Preview
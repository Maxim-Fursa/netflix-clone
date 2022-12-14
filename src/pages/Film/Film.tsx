import React from 'react'
import style from './style.module.scss'
import { HighlightButton } from '../../components'

const Film: React.FC = () => {
    return (
        <div className={style['film-container']}>
            <div className={style.oops}>
                <h2>OOPS</h2>
                <p>Sorry, you haven't subscription to watch this movie</p>
                <HighlightButton>Buy subscription</HighlightButton>
            </div>
        </div>
    )
}

export default Film
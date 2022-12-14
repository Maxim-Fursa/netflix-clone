import React from 'react'
import style from './style.module.scss'

interface IButton {
    onClick?:  React.MouseEventHandler<HTMLButtonElement>,
    children: React.ReactNode
}

const HighlightButton: React.FC<IButton> = ({ onClick, children }) => {
    return (
        <button className={style['highlight-button']} onClick={onClick}>
            {children}
        </button>
    )
}

export default HighlightButton
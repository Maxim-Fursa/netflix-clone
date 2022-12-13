import React from 'react'
import style from './style.module.scss'

interface IItem {
    name: string,
    backdrop_path: string,
    vote_average: number
}

const Continue: React.FC<IItem> = ({ name, backdrop_path, vote_average }) => {
    const [watched, setWatched] = React.useState<number>(0)

    React.useEffect(() => {
        setWatched(Math.floor(Math.random() * 101))
    }, [])
    
    return (
        <div className={style.chapter__item}>
            <img src={`https://image.tmdb.org/t/p/w220_and_h330_multi_faces${backdrop_path}`} alt="" />
            <div className={style.watched}>
                <div className={style.watched__line} style={{width: watched + '%'}}></div>
            </div>
            <div className={style.info}>
                <p className={style.info__name}>{name}</p>
                <p className={style.info__add}>{vote_average.toFixed(2)} / 10</p>
            </div>
        </div>
    )
}

export default Continue
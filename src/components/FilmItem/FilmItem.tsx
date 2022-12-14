import React from 'react'
import { Link } from 'react-router-dom'
import style from './style.module.scss'

interface IItem {
    id: number,
    name: string,
    backdrop_path: string,
    vote_average: number,
    isWatched: boolean
}

const ContinueItem: React.FC<IItem> = ({ id, name, backdrop_path, vote_average, isWatched }) => {
    const [watched, setWatched] = React.useState<number>(0)

    React.useEffect(() => {
        setWatched(Math.floor(Math.random() * 101))
    }, [])
    
    return (
        <Link to={`/film/${id}`}>
            <div className={style.item}>
                <img src={`https://image.tmdb.org/t/p/w220_and_h330_multi_faces${backdrop_path}`} alt="" />
                {isWatched && (
                    <div className={style.item__watched}>
                        <div className={style.item__line} style={{width: watched + '%'}}></div>
                    </div>
                )}
                <div className={style.item__info}>
                    <p className={style.item__name}>{name}</p>
                    <p>{vote_average.toFixed(2)} / 10</p>
                </div>
            </div>
        </Link>
    )
}

export default ContinueItem
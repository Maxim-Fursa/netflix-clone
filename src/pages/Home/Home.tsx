import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { Header } from '../../components'
import style from './style.module.scss'
import { axiosRequest } from '../../api'
import Continue from './Continue'

interface IItems {
    id: number,
    adult: boolean,
    backdrop_path: string,
    poster_path: string,
    first_air_date: string,
    genre_ids: [number],
    media_type: string,
    name: string,
    title: string,
    original_name: string,
    overview: string,
    origin_country: [string],
    original_language: string,
    popularity: number,
    vote_average: number,
    vote_count: number
}

const Home: React.FC = () => {
    const [items, setItems] = React.useState<IItems[]>()
    const [continueWatching, setContinueWatching] = React.useState<IItems[]>()

    React.useEffect(() => {
        axiosRequest('/trending/all/week').then((response: any) => setItems(response.results))
        axiosRequest('/trending/movie/day').then((response: any) => setContinueWatching(response.results))
    }, [])

    return (
        <div className="home-container">
            <Header/>
            <div className={style['home-container__content']}>
                {
                    items && continueWatching ? (
                        <React.Fragment>
                            <div className={style['trend-film']}>
                                <img src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${items[0].poster_path}`} alt="" />
                                <div className={style.info}>
                                    <p className={style.info__xp}>10XP / episode</p>
                                    <div className={style.info__main}>
                                        <p className={style.info__name}>{items[0].name}</p>
                                        <div className={style.info__group}>
                                            <p className={style.info__add}>{items[0].vote_average.toFixed(2)} / 10</p>
                                            <p className={style.info__add}>1 season</p>
                                        </div>
                                        <div className={style.info__group}>
                                            <button className={style.info__watch}>Watch</button>
                                            <button className={style.info__wish}><FontAwesomeIcon icon={faPlus}/></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={style.chapter}>
                                <div className={style.chapter__name}>Continue watching</div>
                                <div className={style.chapter__content}>
                                    {continueWatching.map(el => 
                                        <Continue 
                                            name={el.title || el.name} 
                                            backdrop_path={el.backdrop_path} 
                                            vote_average={el.vote_average} 
                                        />    
                                    )}
                                </div>
                            </div>
                        </React.Fragment>
                    ) : (
                        <p>Loading</p>
                    )
                }
            </div>
        </div>
    )
}

export default Home
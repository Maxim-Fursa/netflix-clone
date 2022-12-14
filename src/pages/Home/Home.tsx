import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import { FilmItem, HighlightButton } from '../../components'
import style from './style.module.scss'
import { axiosRequest } from '../../api'

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
            <div className={style['home-container__content']}>
                {
                    items && continueWatching && (
                        <React.Fragment>
                            <div className={style.poster} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${items[0].poster_path})`}}>
                                <p className={style.poster__xp}>10XP / episode</p>
                                <div className={style.poster__main}>
                                    <p className={style.poster__name}>{items[0].name || items[0].title}</p>
                                    <div className={style.poster__group}>
                                        <p className={style.poster__add}>{items[0].vote_average.toFixed(2)} / 10</p>
                                        <p className={style.poster__add}>1 season</p>
                                    </div>
                                    <div className={style.poster__group}>
                                        <Link to={`/film/${items[0].id}`}><HighlightButton>Watch</HighlightButton></Link>
                                        <button className={style.poster__wish}><FontAwesomeIcon icon={faPlus}/></button>
                                    </div>
                                </div>
                            </div>
                            <div className={style.chapter}>
                                <div className={style.chapter__name}>Continue watching</div>
                                <div className={`${style.chapter__content} ${style['--scroll']}`}>
                                    {continueWatching.map(el => 
                                        <FilmItem 
                                            key={el.id}
                                            id={el.id}
                                            name={el.title || el.name} 
                                            backdrop_path={el.backdrop_path} 
                                            vote_average={el.vote_average} 
                                            isWatched={true}
                                        />    
                                    )}
                                </div>
                            </div>
                            <div className={style.chapter}>
                                <div className={style.chapter__name}>Trending</div>
                                <div className={style.chapter__content}>
                                    {items.map(el => 
                                        <FilmItem 
                                            key={el.id}
                                            id={el.id}
                                            name={el.title || el.name} 
                                            backdrop_path={el.backdrop_path} 
                                            vote_average={el.vote_average} 
                                            isWatched={false}
                                        />    
                                    )}
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }
            </div>
        </div>
    )
}

export default Home
import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faBell, faCommentDots } from '@fortawesome/free-regular-svg-icons'
import classNames from 'classnames';

import style from './style.module.scss'
import { axiosRequest } from '../../api';


interface IResults {
    name: string,
    id: number
}

const Header: React.FC = () => {
    const navigate = useNavigate()
    const [focus, setFocus] = React.useState<boolean>(false)
    const [results, setResults] = React.useState<IResults[] | undefined | false>()
    const [totalResults, setTotalResults] = React.useState<number>(0)

    const debounce = (fn: Function, ms: number) => {
        let timeout: ReturnType<typeof setTimeout>;
        return (...args: any[]) => {
            const fnCall = () => fn(...args)
            clearTimeout(timeout);
            timeout = setTimeout(fnCall, ms)
        }
    }

    const search = (e: any) => {
        if (e.target.value) {
            axiosRequest('/search/keyword', `&query=${e.target.value}`)
            .then((response: any) => {
                if (response.results && response.results.length ) {
                    setResults(response.results)
                    setTotalResults(response.total_results)
                } else setResults(false)
            })
        } else setResults(undefined)
    }

    const onChange = debounce(search, 500)

    return (
        <header>
            <div className={style.navigate}>
                <div className={style.header__buttons}>
                    <button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faChevronLeft}/></button>
                    <button onClick={() => navigate(1)}><FontAwesomeIcon icon={faChevronRight}/></button>
                </div>
                {focus && <div className={style.navigate__layer} onClick={() => setFocus(false)}></div>}
                <div className={style.navigate__search}>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    <input 
                        className={classNames({[style['--focus']]: focus})}
                        type="text" 
                        placeholder='Search...' 
                        onChange={onChange} 
                        onFocus={() => setFocus(true)}
                    />
                    {focus && (
                        <div className={style.navigate__results}>
                            <p className={style.navigate__query}>{results ? `Results: ${totalResults}` : (results === undefined ? 'Start to write name of your movie or tv show' : 'Sorry, nothing found') }</p>
                            <ul>
                                {results && results.map(el => 
                                    <Link to={`/film/${el.id}`} onClick={() => setFocus(false)}><li key={el.id}>{el.name}</li></Link>
                                )}
                            </ul>
                        </div>
                    )}
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
import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons'
import { faBell, faCommentDots } from '@fortawesome/free-regular-svg-icons'
import classNames from 'classnames';

import style from './style.module.scss'
import { axiosRequest } from '../../api';
import { useAppSelector } from '../../store/hooks';
import Authorized from '../Authorized/Authorized';

interface IResults {
    name: string,
    id: number
}

interface IHeader {
    container: any
}

const Header: React.FC<IHeader> = ({ container }) => {
    const navigate = useNavigate()
    const [focus, setFocus] = React.useState<boolean>(false)
    const [results, setResults] = React.useState<IResults[] | undefined | false>()
    const [totalResults, setTotalResults] = React.useState<number>(0)

    const dimensions = useAppSelector(state => state.dimensions)

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

    const mobileMenuToogler = () => {
        if (container.current) {
            container.current.classList.toggle('--open')
        }
    }

    React.useEffect(() => {
        if (dimensions.width > 1050) container.current.classList.remove('--open')
    }, [dimensions.width])

    return (
        <header>
            <div className={style.navigate}>
                <div className={style.header__buttons}>
                    {
                        dimensions.width < 1050 ? (
                            <button onClick={mobileMenuToogler}><FontAwesomeIcon icon={faBars}/></button>
                        ) : (
                            <React.Fragment>
                                <button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faChevronLeft}/></button>
                                <button onClick={() => navigate(1)}><FontAwesomeIcon icon={faChevronRight}/></button>
                            </React.Fragment>
                        )
                    }
                </div>
                {focus && <div className={style.navigate__layer} onClick={() => setFocus(false)}></div>}
                <div className={classNames(style.navigate__search, {[style['--focus']]: focus})} onClick={() => setFocus(true)}>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    <input 
                        type="text" 
                        placeholder='Search...' 
                        onChange={onChange} 
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
                { dimensions.width > 735 && <Authorized/> }
            </div>
        </header>
    )
}

export default Header
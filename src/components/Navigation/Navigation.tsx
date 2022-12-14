import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './style.module.scss'
import { privateRotues } from '../../router'
import classNames from 'classnames'

const Navigation: React.FC = () => {
    const [active, setActive] = React.useState<string>('/')
    const names = {0: 'Menu', 3: 'Social', 5: 'General'}
    const line = React.useRef<any>()

    React.useEffect(() => {
        if (line) {
            setActive(document.location.pathname)
            
            let activeItem = document.querySelector<any>(`.${style.navigation__item}.${style['--active']}`)
            if (activeItem) {
                line.current.style.height = activeItem.offsetHeight+'px'
                line.current.style.top = activeItem.offsetTop+'px'
            }
        }
    })

    return (
        <div className={style.navigation}>
            <div className={style.navigation__top}>
                <p className={style.logo}>Netflix<span>.</span></p>
            </div>
            <ul className={style.navigation__menu}>
                {privateRotues.map((el, idx) => 
                    <React.Fragment>
                        {(idx == 0 || idx == 3 || idx == 5) && <li className={style.navigation__title}>{names[idx]}</li>}
                        <li key={el.path} className={classNames(style.navigation__item, {[style['--active']]: active == el.path})}>
                            <FontAwesomeIcon icon={el.icon} />
                            <Link to={el.path}>{el.title}</Link>
                        </li>
                    </React.Fragment>
                )}
                <li ref={line} className={style.navigation__line}></li>
            </ul>
        </div>
    )
}

export default Navigation
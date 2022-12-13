import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './style.module.scss'
import { publicRoutes } from '../../router'
import classNames from 'classnames'

const Navigation: React.FC = () => {
    const [active, setActive] = React.useState<string>('/')
    const line = React.useRef<any>()

    React.useEffect(() => {
        if (line) {
            setActive(document.location.pathname)
            
            let activeItem = document.querySelector<any>(`.${style.navigation__item}.${style['--active']}`)
            if (activeItem) {
                line.current.style.height = activeItem.offsetHeight+'px'
                line.current.style.top = activeItem.offsetTop+'px'
            }
    
            // document.querySelectorAll<any>('.navigation__item.--active').forEach(el => {
            //     el.addEventListener('click', () => {
            //         el.currentTarget.classList.add('choose')
            //         let top = el.currentTarget.offsetTop
            //         let height =  el.currentTarget.offsetHeight
            //         if (line.current) {
            //             line.current.style.top = top+'px'
            //             line.current.style.height = height+'px'
            //         }
            //     })
            // })
        }
    })

    return (
        <div className={style.navigation}>
            <div className={style.navigation__top}>
                <p className={style.logo}>Netflix<span>.</span></p>
            </div>
            <ul className={style.navigation__menu}>
                <li className={style.navigation__title}>Menu</li>
                {publicRoutes.map(el => 
                    <li key={el.path} className={classNames(style.navigation__item, {[style['--active']]: active == el.path})}>
                        <FontAwesomeIcon icon={el.icon} />
                        <Link to={el.path}>{el.title}</Link>
                    </li>
                )}
                <li ref={line} className={style.navigation__line}></li>
            </ul>
        </div>
    )
}

export default Navigation
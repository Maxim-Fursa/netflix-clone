import { HomePage } from "../pages"
import { faCompass } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faCalendar } from '@fortawesome/free-regular-svg-icons'

export enum Path {
    HOME = "/",
    WISHLIST = '/wishlist',
    COMMING = '/comming-soon'
}

interface IRoutes {
    path: string,
    elem: React.ComponentType,
    icon: typeof faCompass,
    title: string
}

export const publicRoutes: IRoutes[] = [
    {path: Path.HOME, elem: HomePage, icon: faCompass, title: 'Browse'},
    {path: Path.WISHLIST, elem: HomePage, icon: faHeart, title: 'Wishlist'},
    {path: Path.COMMING, elem: HomePage, icon: faCalendar, title: 'Comming soon'}
]

export const privateRotues: IRoutes[] = [
    {path: Path.HOME, elem: HomePage, icon: faCompass, title: 'Browse'}
]
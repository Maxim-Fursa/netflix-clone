import { Home, Preview } from "../pages"
import { faCompass, faGear, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faCalendar, faUser } from '@fortawesome/free-regular-svg-icons'

export enum RouteNames {
    HOME = "/",
    WISHLIST = '/wishlist',
    COMMING = '/comming-soon',
    FRIENDS = '/friends',
    PARTIES = '/parties',
    SETTINGS = '/settings',
    PREVIEW = '/',
}

interface IPublicRoutes {
    path: string,
    elem: React.ComponentType
}

interface IPrivateRoutes {
    path: string,
    elem: React.ComponentType,
    icon: typeof faCompass,
    title: string
}

export const publicRoutes: IPublicRoutes[] = [
    {path: RouteNames.HOME, elem: Preview},
]

export const privateRotues: IPrivateRoutes[] = [
    {path: RouteNames.HOME, elem: Home, icon: faCompass, title: 'Browse'},
    {path: RouteNames.WISHLIST, elem: Home, icon: faHeart, title: 'Wishlist'},
    {path: RouteNames.COMMING, elem: Home, icon: faCalendar, title: 'Comming soon'},
    {path: RouteNames.FRIENDS, elem: Home, icon: faUser, title: 'Friends'},
    {path: RouteNames.PARTIES, elem: Home, icon: faUserGroup, title: 'Parties'},
    {path: RouteNames.SETTINGS, elem: Home, icon: faGear, title: 'Settings'}
]
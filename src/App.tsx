import React, { MutableRefObject } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { login, logout } from './store/authSlice'
import { setDimensions } from './store/resizeSlice';
import { useAppDispatch, useAppSelector } from './store/hooks'

import { publicRoutes, privateRotues, RouteNames } from './router'
import { Navigation, Header } from './components'
import { Film } from './pages'

initializeApp({
    apiKey: "AIzaSyC-QtR3SaD7Nd5IV8vhQoj01OmZE7Bt_Po",
    authDomain: "neteflix-clone-d08c7.firebaseapp.com",
    projectId: "neteflix-clone-d08c7",
    storageBucket: "neteflix-clone-d08c7.appspot.com",
    messagingSenderId: "38269235870",
    appId: "1:38269235870:web:6eb4aa85c38d1fd517c18f",
    measurementId: "G-FJQWS21J21"
});

const App: React.FC = () => {
	const firebaseAuth = getAuth()
	const dispatch = useAppDispatch()
	const auth = useAppSelector(store => store.authentication.isAuth) 
	const [isLoading, setIsLoading] = React.useState<boolean>(true)
	const container = React.createRef<HTMLDivElement>()

	const handleResize = () => {
		dispatch(setDimensions({
			height: window.innerHeight,
			width: window.innerWidth
		}))
	}

	onAuthStateChanged(firebaseAuth, (user) => {
		if (!user) {
			dispatch(logout())
		}
	})

	React.useLayoutEffect(() => {
		const storage = localStorage.getItem('auth')
		const storageParsed = storage && JSON.parse(storage)
		if (storage) {
			dispatch(login(storageParsed))
		} else dispatch(logout())
		setTimeout(() => {
			setIsLoading(false)
		}, 1000);
		window.addEventListener('load', handleResize)
	}, [])

	React.useEffect(() => {
		window.addEventListener('resize', handleResize)
	})

	return (
		<div className="app-container">
			{
				isLoading ? (
					<h2 className="big-word">NETFLIX</h2>
				) : (
					auth ?
						<React.Fragment>
							<Navigation/>
							<div ref={container} className="app-container__content">
								<Header container={container}/>
								<Routes>
									{privateRotues.map(el => 
										<Route index key={el.path} path={el.path} element={<el.elem/>} />	
									)}
									<Route path="/film/:id" element={<Film/>} />
									<Route path="*" element={<Navigate to={RouteNames.HOME} replace />} />
								</Routes>
							</div>
						</React.Fragment>
					:
						<Routes>
							{publicRoutes.map(el => 
								<Route index key={el.path} path={el.path} element={<el.elem/>} />	
							)}
							<Route path="*" element={<Navigate to={RouteNames.PREVIEW} replace />} />
						</Routes>
					)
			}
		</div>
	)
}

export default App

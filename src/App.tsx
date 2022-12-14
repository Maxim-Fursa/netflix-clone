import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

import { login, logout } from './store/authSlice'
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

const App = () => {
	const firebaseAuth = getAuth()
	let [authHook] = useAuthState(firebaseAuth)

	const dispatch = useAppDispatch()
	const auth = useAppSelector(store => store.authentication.isAuth) 

	React.useLayoutEffect(() => {
		const storage = JSON.parse(localStorage.getItem('auth') || '{}')
		if (storage) {
			dispatch(login())
		}
	}, [])

	return (
		<div className="app-container">
			{auth ?
				<React.Fragment>
					<Navigation/>
					<div className="app-container__content">
						<Header/>
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
			}
		</div>
	)
}

export default App

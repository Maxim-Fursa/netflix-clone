import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { publicRoutes, privateRotues} from './router'
import { Navigation } from './components'

function App() {
	const auth = false

	return (
		<div className="app-container">
			<Navigation/>
			<div className="app-container__content">
				<Routes>
					{auth ?
							privateRotues.map(el => 
								<Route index key={el.path} path={el.path} element={<el.elem/>} />	
							)
						:
							publicRoutes.map(el => 
								<Route index key={el.path} path={el.path} element={<el.elem/>} />	
							)
					}
				</Routes>
			</div>
		</div>
	)
}

export default App

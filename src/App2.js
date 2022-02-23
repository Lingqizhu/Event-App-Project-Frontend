import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './login2'
import Register from './Register'
import Dashboard from './Dashboard'

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Route path="/auth" exact component={Login} />
				<Route path="/Register" exact component={Register} />
				<Route path="/Dashboard" exact component={Dashboard} />
			</BrowserRouter>
		</div>
	)
}

export default App
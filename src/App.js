import React from 'react'

import { Provider } from './context/store'

import Header from './components/Header'
import Content from './components/Content'

const App = () => {
	return (
		<Provider>
			<Header />
			<Content />
		</Provider>
	)
}

export default App

import React, { createContext, useReducer, useEffect, useState } from 'react'
import appReducer from './appReducer'
import useActions from './useActions'

// initial state
const initState = {
	error: '',
	start: 0,
	limit: 12, // initial number of card to fetch
	moreImages: true,
	isSearch: false,
	searchQuery: '',
	images: [],
	collection: []
}

// create context
export const Context = createContext(initState)

// craate Provider component
export const Provider = ({ children }) => {
	const [state, dispatch] = useReducer(appReducer, initState)
	const [loading, setLoading] = useState(false)
	const actions = useActions(state, setLoading, dispatch)
	const [view, setView] = useState('list')

	useEffect(() => {
		// fetch images from api and collection from localStorage
		actions.fetchImages()
		actions.getCollection()

		// eslint-disable-next-line
	}, [])

	return (
		<Context.Provider value={{ ...state, ...actions, loading, view, setView }}>
			{children}
		</Context.Provider>
	)
}

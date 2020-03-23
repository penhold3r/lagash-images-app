import React, { useContext } from 'react'
import ImagesList from './ImagesList'
import CollectionList from './CollectionList'

import { Context } from '../context/store'

const Content = () => {
	// get current view fomr context
	const { view } = useContext(Context)

	// this should be handled by Routes...
	// map component to view string in context
	const component = new Map([
		['list', <ImagesList />],
		['collection', <CollectionList />]
	])

	return <div className="content">{component.get(view)}</div>
}

export default Content

import React, { useContext } from 'react'
import { Context } from '../context/store'

import CollectionCard from './CollectionCard'

const CollectionList = () => {
	// get collection from context
	const { collection } = useContext(Context)

	return (
		<div className="collection-list">
			<h2 className="collection-list__title">My Collection</h2>
			{collection.length > 0 ? (
				collection.map(img => <CollectionCard key={img.id} image={img} />)
			) : (
				<span className="empty">
					It seems you haven't saved anything yet <i className="far fa-frown"></i>
				</span>
			)}
		</div>
	)
}

export default CollectionList

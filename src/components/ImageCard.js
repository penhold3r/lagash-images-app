import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Context } from '../context/store'

const ImageCard = ({ image, lastRef }) => {
	// get actions from context
	const { collection, save } = useContext(Context)
	// initialize saved image state
	const [saved, setSaved] = useState(false)

	const handleClick = () => {
		// set saved state
		setSaved(!saved)
		// update context state
		save({ ...image, description: '' })
	}

	useEffect(() => {
		// check if image is saved in collection
		const isSaved = collection.find(img => img.id === image.id)
		// if saved set state
		isSaved && setSaved(true)
		// eslint-disable-next-line
	}, [])

	return (
		<div
			data-id={image.id}
			className={saved ? 'images-list__card saved' : 'images-list__card'}
			ref={lastRef}
		>
			<div className="images-list__card__save" onClick={handleClick}>
				{saved ? <i className="icon fas fa-heart"></i> : <i className="icon far fa-heart"></i>}
			</div>
			<img src={image.url} alt={image.title} className="images-list__card__image" />
			<h3 className="images-list__card__description">
				{// Capitalize title/description
				image.title.replace(/^\w/, char => char.toUpperCase())}
			</h3>
		</div>
	)
}

ImageCard.propTypes = {
	image: PropTypes.object.isRequired,
	lastRef: PropTypes.func
}

export default ImageCard

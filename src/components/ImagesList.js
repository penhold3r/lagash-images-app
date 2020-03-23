import React, { useContext } from 'react'
import { Context } from '../context/store'
import Loading from './Loading'
import ImageCard from './ImageCard'

const ImagesList = () => {
	// get actions and state properties from context
	const { loading, fetchImages, isSearch, search, searchQuery, images, moreImages } = useContext(
		Context
	)

	// observe last card to fetch more images while scrolling
	const obverveLast = last => {
		// create observer
		const observer = new IntersectionObserver(entries => {
			// check if last card is visible and if there is more images to fetch
			if (entries[0].isIntersecting && moreImages) {
				// check if displaying search or normal images
				isSearch ? search(searchQuery) : fetchImages()
			}
		})

		// asign observer
		last && observer.observe(last)
	}

	return (
		<div className="images-list">
			{loading && isSearch ? (
				<Loading />
			) : (
				images.length > 0 &&
				images.map((img, i) => {
					// if last card asign to observer
					return i === images.length - 1 ? (
						<ImageCard key={i} image={img} lastRef={obverveLast} />
					) : (
						<ImageCard key={i} image={img} />
					)
				})
			)}
		</div>
	)
}

export default ImagesList

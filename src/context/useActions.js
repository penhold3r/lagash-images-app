import axios from 'axios'

// custom action hook
export default (state, setLoading, dispatch) => {
	const fetchImages = async () => {
		setLoading(true) // activate loading state
		try {
			const { data } = await axios({
				method: 'GET',
				url: 'https://jsonplaceholder.typicode.com/photos',
				params: { _start: state.start, _limit: state.limit }
			})

			dispatch({
				type: 'FETCH',
				payload: {
					moreImages: data.length > 0, // check if there is more images to fetch
					images: [...data]
				}
			})
			setLoading(false)
		} catch (err) {
			dispatch({ type: 'ERROR', payload: err })
			setLoading(false)
		}
	}

	const search = async query => {
		setLoading(true) // activate loading state
		try {
			if (query) {
				const { data } = await axios({
					method: 'GET',
					url: 'https://jsonplaceholder.typicode.com/photos',
					params: { _start: state.start, _limit: state.limit, q: query.toLowerCase() }
				})

				dispatch({
					type: 'SEARCH',
					payload: {
						moreImages: data.length > 0, // check if there is more images to fetch
						searchQuery: query.toLowerCase(), // save query to scroll loading
						images: [...data]
					}
				})
				setLoading(false)
			} else {
				dispatch({ type: 'FETCH', payload: state.images })
				setLoading(false)
			}
		} catch (err) {
			dispatch({ type: 'ERROR', payload: err.response.data.error })
			setLoading(false)
		}
	}

	const getCollection = () => {
		// get collection from local storage
		const collection = localStorage.getItem('collection')
		// if found save to context state
		collection && dispatch({ type: 'GET_COLLECTION', payload: JSON.parse(collection) })
	}

	const save = image => {
		// get collection from local storage
		const collection = JSON.parse(localStorage.getItem('collection'))
		// if there is a collection, add image, otherwise create new collection
		const newCollection = collection ? [...collection, image] : [{ ...image }]

		// save collection to local storage and update context state
		localStorage.setItem('collection', JSON.stringify(newCollection))
		dispatch({ type: 'SAVE', payload: image })
	}

	const unsave = id => {
		// get collection from local storage
		const collection = JSON.parse(localStorage.getItem('collection'))
		// filter out image
		const newCollection = collection.filter(img => img.id !== id)

		// save collection to local storage and update context state
		localStorage.setItem('collection', JSON.stringify(newCollection))
		dispatch({ type: 'UNSAVE', payload: id })
	}

	const edit = editedImage => {
		// get collection from local storage
		const collection = JSON.parse(localStorage.getItem('collection'))
		// find index of image in collection
		const index = collection.findIndex(img => img.id === editedImage.id)

		// override item with new title/description
		collection[index] = { ...editedImage }
		// save collection to local storage and update context state
		localStorage.setItem('collection', JSON.stringify(collection))
		dispatch({ type: 'EDIT', payload: editedImage })
	}

	return { fetchImages, search, getCollection, save, unsave, edit }
}

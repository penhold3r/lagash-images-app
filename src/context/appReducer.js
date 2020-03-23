export default (state, action) => {
	switch (action.type) {
		case 'FETCH':
			return {
				...state,
				start: state.start + 12, // next pagination
				moreImages: action.payload.moreImages,
				isSearch: false,
				searchQuery: '',
				images: [...state.images, ...action.payload.images]
			}
		case 'SEARCH':
			return {
				...state,
				start: state.start + 12, // next pagination
				isSearch: true,
				searchQuery: action.payload.searchQuery,
				moreImages: action.payload.moreImages,
				images: [...action.payload.images]
			}
		case 'GET_COLLECTION':
			return {
				...state,
				collection: [...action.payload]
			}
		case 'SAVE':
			return {
				...state,
				collection: [...state.collection, action.payload]
			}
		case 'UNSAVE':
			return {
				...state,
				// filter out item from collection
				collection: state.collection.filter(c => c.id !== action.payload)
			}
		case 'EDIT':
			// finde and replace image title/description
			let edited = state.collection.find(img => img.id === action.payload.id)
			edited.title = action.payload.title

			return {
				...state,
				collection: [...state.collection]
			}
		case 'ERROR':
			console.error('ERROR')
			return {
				...state,
				error: action.payload
			}
		default:
			return state
	}
}

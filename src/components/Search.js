import React, { useState, useContext } from 'react'
import { Context } from '../context/store'

const Search = () => {
	// get action from context
	const { search } = useContext(Context)
	// initialite input query state
	const [query, setQuery] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		// check if there is text to start search
		query !== '' && search(query)
		// reset input
		setQuery('')
	}

	return (
		<div className="search">
			<form className="search__form" onSubmit={handleSubmit}>
				<input
					className="search__form__input"
					type="text"
					value={query}
					onChange={e => setQuery(e.target.value)}
					placeholder="search..."
				/>
				<button className="search__form__submit" type="submit" title="Search">
					<i className="fa fa-search"></i>
				</button>
			</form>
		</div>
	)
}

export default Search

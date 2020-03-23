import React, { useContext } from 'react'
import Search from './Search'

import logo from '../images/logo.png'
import { Context } from '../context/store'

const Header = () => {
	// get setter for view from context
	const { setView } = useContext(Context)

	const handleClick = e => {
		e.preventDefault()

		// set new view based on data attribute of link
		setView(e.currentTarget.dataset.view)
	}

	return (
		<header className="site-header">
			<div className="site-header__container">
				<h1 className="site-header__container__logo">
					<img src={logo} alt="" />
					<span>AwesomeImages</span>
				</h1>

				<Search />

				<nav className="site-header__container__nav">
					<a href="/" className="home" data-view="list" onClick={handleClick}>
						<i className="icon fas fa-home"></i>
						<span>Home</span>
					</a>
					<a href="/" className="collection" data-view="collection" onClick={handleClick}>
						<i className="icon fas fa-heart"></i>
						<span>My Collection</span>
					</a>
				</nav>
			</div>
		</header>
	)
}

export default Header

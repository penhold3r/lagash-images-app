import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Context } from '../context/store'
import EditModal from './EditModal'

const CollectionCard = ({ image }) => {
	// get actions from context
	const { unsave, edit } = useContext(Context)
	// initialize modal state
	const [modal, setModal] = useState(false)

	return (
		<>
			{modal && <EditModal open={modal} setModal={setModal} edit={edit} image={image} />}
			<div className="collection-list__card">
				<div
					className="collection-list__card__save"
					title="unsave"
					onClick={() => unsave(image.id)}
				>
					<i className="icon fas fa-heart"></i>
				</div>
				<img src={image.url} alt={image.title} className="collection-list__card__image" />
				<h3 className="collection-list__card__description">
					{// Capitalize title/description
					image.title.replace(/^\w/, char => char.toUpperCase())}
				</h3>
				<div className="collection-list__card__actions">
					<a
						href={image.url}
						className="action-btn"
						title="download"
						download={image.url}
						rel="noreferrer noopener"
						target="_blank"
					>
						<i className="icon fas fa-file-download"></i>
					</a>
					<div className="action-btn" title="edit" onClick={() => setModal(true)}>
						<i className="icon fas fa-pen"></i>
					</div>
				</div>
			</div>
		</>
	)
}

CollectionCard.propTypes = {
	image: PropTypes.object.isRequired
}

export default CollectionCard

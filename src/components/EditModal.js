import React, { Component } from 'react'
import PropTypes from 'prop-types'

// super old class based component :P
class EditModal extends Component {
	// initial state
	state = {
		description: ''
	}

	handleEdit = e => {
		// get props
		const { image, edit, setModal } = this.props

		e.preventDefault()
		// override image title/description
		image.title = this.state.description
		// update state in context
		edit(image)
		// close modal
		setModal(false)
	}

	handleClose = e => {
		e.preventDefault()
		// close modal
		this.props.setModal(false)
	}

	componentDidMount() {
		// get description from props and update component state
		const description = this.props.image.title
		this.setState({ description })
	}

	render() {
		return (
			<div className={this.props.open ? 'edit-modal open' : 'edit-modal'}>
				<div className="edit-modal__content">
					<h3 className="edit-modal__content__title">Edit Description</h3>
					<form className="edit-modal__content__form" onSubmit={this.handleEdit}>
						<input
							className="form-input"
							type="text"
							value={this.state.description}
							onChange={e => this.setState({ description: e.target.value })}
						/>
						<div className="form-buttons">
							<button
								className="form-buttons__btn cancel"
								type="button"
								onClick={this.handleClose}
							>
								Cancel
							</button>
							<button className="form-buttons__btn save" type="submit">
								<span>Save</span>
								<i className="fas fa-check-circle"></i>
							</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

EditModal.propTypes = {
	image: PropTypes.object.isRequired,
	edit: PropTypes.func.isRequired,
	setModal: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired
}

export default EditModal

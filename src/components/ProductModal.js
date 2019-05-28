import React from 'react';
import { findDOMNode } from 'react-dom';

class ProductModal extends React.Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {
		document.addEventListener('click', this.handleClickOutside.bind(this), true)
	}
	componentWillUnmount() {
		document.removeEventListener('click', this.handleClickOutside.bind(this), true)
	}

	handleClickOutside(e) {
		const modal = findDOMNode(this.refs.modal);
		console.log(modal);
		if ( !modal || !modal.contains(e.target) ) {
			this.props.closeModal();
		}
	}

	handleClose() {
		this.props.closeModal();
	}

	render() {
		return(
			<div className={this.props.openModal ? 'modal-wrapper active' : 'modal-wrapper'}>
				<div className="modal" ref="modal">
					<button
						className="close"
						onClick={this.handleClose.bind(this)}
					>
						&times;
					</button>
					<div className="quick-view">
						<div className="quick-view-image">
							<img
							src={this.props.quickViewProduct.image} 
							alt={this.props.quickViewProduct.name}
							/>
						</div>
						<div className="quick-view-details">
							<span className="product-name">{this.props.quickViewProduct.name}</span>
							<span className="product-price">{this.props.quickViewProduct.price}</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default ProductModal;
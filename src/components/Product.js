import React from 'react';
import Counter from './Counter';

class Product extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedProduct: {},
			isAdded: false,
			quickViewProduct: {}
		};
	}

	addToCart(image, name, price, id, quantity) {
		this.setState(
			{
				selectedProduct: {
					image: image,
					name: name,
					price: price,
					id: id,
					quantity: quantity
				}
			},
			function() {
				this.props.addToCart(this.state.selectedProduct)
			}
		);
		this.setState(
		{
			isAdded: true
		},
		function() {
			setTimeout(() => {
				this.setState(
					{
						isAdded: false
					}
				);
			}, 1000);
		}

		);
	}

	quickView(image, name, price, id) {
		this.setState(
			{
				quickViewProduct: {
					image: image,
					name: name,
					price: price,
					id: id
				}
			},
			function() {
				this.props.openModal(this.state.quickViewProduct);
			}
		);
	}

	render() {
		let image = this.props.image;
		let name = this.props.name;
		let price = this.props.price;
		let id = this.props.id;
		let quantity = this.props.productQuantity;

		return(
	
				<div className="product">

					<div className="product-image">
						<img 
							src={image} 
							alt={name}
							onClick={this.quickView.bind(
								this,
								image,
								name,
								price,
								id,
								quantity
							)
						}
						/>
					</div>
					<h4 className="product-name">{name}</h4>
					<p className="product-price">{price}</p>
					<Counter 
						productQuantity={this.props.productQuantity}
						updateQuantity={this.props.updateQuantity}
					/>
					<div className="add-wrapper">
						<button
							className={!this.state.isAdded ? ' ' : 'added'}
							onClick={this.addToCart.bind(
								this,
								image,
								name,
								price,
								id,
								quantity
							)}
						>
							{!this.state.isAdded ? 'ADD TO CART' : 'ADDED'}
						</button>
					</div>
			</div>

		);
	}
}

export default Product;
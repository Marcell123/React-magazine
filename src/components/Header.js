import React, { Component } from "react";
import EmptyCart from '../empty/EmptyCart';
import CartScrollBar from './CartScrollBar';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { findDOMNode } from "react-dom";


class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showCart: false,
			cart: this.props.cartItems
		};
		this.handleCart = this.handleCart.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	handleCart() {
		this.setState({
			showCart: !this.state.showCart
		});
	}

	handleClickOutside(e) {
		const cartNode = findDOMNode(this.refs.cartList);
		const buttonNode = findDOMNode(this.refs.cartIcon);
		if (cartNode.classList.contains('active')) {
			if ( !buttonNode || !cartNode.contains(e.target) ) {
				this.setState({
					showCart: false
				});
				e.stopPropagation();
			}
		}
	}

	componentDidMount() {
		document.addEventListener('click', this.handleClickOutside.bind(this), true);
	}
	componentWillUnmount() {
		document.removeEventListener('click', this.handleClickOutside.bind(this), true);
	}

	render() {

		let cartItems;
		cartItems = this.state.cart.map(product => {
			return(
				<CSSTransition key={product.name} classNames={'fade'} timeout={{enter:500, exit: 300}}>
					<li className="item" key={product.name}>
						<img className="item-image"  src={product.image} alt=""/>
						<div className="item-info">
							<p className="item-name">{product.name}</p>
							<p className="item-price">{product.price}</p>
						</div>
						<div className="item-total">
							<p className="quantity">{product.quantity} {product.quantity > 1 ? 'Nos.' : 'No.'}</p>
							<p className="amount">{product.quantity * product.price}</p>
						</div>
						<a 
							href="#" 
							className="item-remove"
							onClick={this.props.itemRemove.bind(this, product.id)}
						>
							×
						</a>
				</li>
				</CSSTransition>
			);
		});
		let view;
		if (cartItems.length <= 0) {
			view = <EmptyCart />
		} else {
			view = (
				<TransitionGroup 
					component="ul"
				>
					{cartItems}
				</TransitionGroup>
			)
		}

		return(
			<header> 
				<div className="container">
				 	<div className="brand">
						<img
	            className="logo"
	            src="https://res.cloudinary.com/sivadass/image/upload/v1493547373/dummy-logo/Veggy.png"
	            alt="Veggy Brand Logo"
          	/>
				 	</div>

				 	<div className="search">
						<input 
							type="search" 
							placeholder="Search for Vegetables and Fruits"
							className="search-keyword"
							value={this.props.term}
							onChange={this.props.handleSearch}
						/>
						<button 
							className="search-button"
							type="submit"
						/>
				 	</div>

				 	<div className="cart">
						<div className="cart-info">
              <table>
                <tbody>
                  <tr>
                    <td>No. of items</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.totalItems}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Sub Total</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.totalAmount}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
						<a 
							className="cart-icon"
							href="#"
							onClick={this.handleCart}
							ref="cartIcon"
						>
							<img 
								className={this.props.cartShake ? 'dance' : ''}
								src="https://res.cloudinary.com/sivadass/image/upload/v1493548928/icons/bag.png" 
								alt="Cart"/>
						</a>
						<div 
							className={
								this.state.showCart ? 'cart-list active' : 'cart-list'
							}
							ref="cartList"
						>
							<CartScrollBar>{view}</CartScrollBar>
							<div className="proceed-checkout">
								<button
									className={this.state.cart.length > 0 ? ' ' : 'disabled'}
								>
									proceed to checkout
								</button>
							</div>
						</div>

				 	</div>

				</div>
			</header>
		);
	}
}

export default Header;
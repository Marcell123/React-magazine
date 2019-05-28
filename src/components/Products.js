import React from 'react';
import Product from './Product';

class Products extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let term = this.props.searchTerm;
		let listItems;
		let x;

		function searchingFor(term) {
      return function(x) {
        return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
      };
    }

		listItems = this.props.productsList
			.filter(searchingFor(term))
			.map((product) => {
				return(
					<Product
	          key={product.id}
	          price={product.price}
	          name={product.name}
	          image={product.image}
	          id={product.id}
	          totalAmount={this.props.totalAmount}
	          totalItems={this.props.totalItems}
	          productQuantity={this.props.productQuantity}
	          updateQuantity={this.props.updateQuantity}
	          addToCart={this.props.addToCart}
	          openModal={this.props.openModal}
	         />
				);
			});
	
		return (
			<div className="products-wrapper">
				<div className="products">
					{listItems}
				</div>
			</div>
		);
	}
};


export default Products;
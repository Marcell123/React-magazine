import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Header from './components/Header';
import Products from './components/Products';
import ProductModal from './components/ProductModal';
import './scss/style.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      totalItems: 0,
      totalAmount: 0,
      quantity: 1,
      term: "",
      quickViewProduct: {},
      modalActive: false,
      cartShake: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.sumTotalItems = this.sumTotalItems.bind(this);
    this.sumTotalAmount = this.sumTotalAmount.bind(this);
    this.itemRemove = this.itemRemove.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  // Fetch Initial Set of Products from external API
  getProducts() {
    let url =
      "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json";
    axios.get(url).then(response => {
      this.setState({
        products: response.data
      });
      console.log(this.state.products);
    });
  }
  componentWillMount() {
    this.getProducts();
  }

  //Search by Keyword
  handleSearch(e) {
    this.setState({ term: e.target.value });
  }

  updateQuantity(itemQuantity) {
    console.log('Product has been added successfully');
    this.setState({
      quantity: itemQuantity
    });
  }

  // Add to Cart
  handleAddToCart(selectedProducts) {
    // console.log(selectedProducts);
    let cartItems = this.state.cart;
    let productID = selectedProducts.id;
    let productQuantity = selectedProducts.quantity;
    if(this.checkProduct(productID)) {
      console.log('hi');
      let index = cartItems.findIndex(x => x.id == productID);
      cartItems[index].quantity = 
        Number(cartItems[index].quantity) + Number(productQuantity);
      this.setState({
        cart: cartItems
      });
    } else {
      console.log(cartItems.push(selectedProducts));
      console.log(cartItems);
    }

    this.setState({
      totalItems: this.state.quantity,
      cartShake: true
    });
    setTimeout(
      function() {
        this.setState({
          cartShake: false
        });
      }.bind(this),
      500
    );

    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
  }

  itemRemove(id, e) {
    let cart = this.state.cart;
    let index = cart.findIndex(x => x.id == id);
    cart.splice(index, 1);
    this.setState({
      cart: cart
    });
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
    e.preventDefault();
  }

  sumTotalItems() {
    let cart = this.state.cart;
    let total = cart.length;
    this.setState({
      totalItems: total
    });
  }

  sumTotalAmount() {
    let cart = this.state.cart;
    let total = 0;
    for(var i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].quantity;
    }
    this.setState({
      totalAmount: total
    });
  }

  checkProduct(productID) {
    let cart = this.state.cart;
    return cart.some(function(item) {
      return item.id === productID
    });
  }

  openModal(view) {
    this.setState({
      quickViewProduct: view,
      modalActive: true,
    });
  }

  closeModal() {
    this.setState({
      modalActive: false
    });
  }

  render() {
    return(
      <div className="container">
        <Header 
          totalAmount={this.state.totalAmount}
          totalItems={this.state.totalItems}
          handleSearch={this.handleSearch}
          term={this.state.term}
          cartShake={this.state.cartShake}
          cartItems={this.state.cart}
          itemRemove={this.itemRemove}
        />
        <Products 
          productsList={this.state.products}
          productQuantity={this.state.quantity}
          updateQuantity={this.updateQuantity}
          addToCart={this.handleAddToCart}
          searchTerm={this.state.term}
          totalAmount={this.state.totalAmount}
          totalItems={this.state.totalItems}
          openModal={this.openModal}
        />
        <ProductModal
          openModal={this.state.modalActive}
          closeModal={this.closeModal}
          quickViewProduct={this.state.quickViewProduct}
        />
      </div>
    );
  }

}


ReactDOM.render(<App />, document.getElementById('root'));

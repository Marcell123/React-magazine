import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

class CartScrollBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleScroll = this.handleScroll.bind(this);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll)
	}

	handleScroll(e) {
		const positions = this.refs.scrollbars.getValues();
	}



	render() {
		return (
			<Scrollbars style={{ width: 360, height: 320 }} ref="scrollbars">
				{this.props.children}
			</Scrollbars>
		);
	}
}

export default CartScrollBar;
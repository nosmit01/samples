import { connect } from 'react-redux';
import { map } from 'lodash';
import { Button, Popup, List } from 'semantic-ui-react';
import React, { Component, PropTypes } from 'react';

class Header extends Component {
  static propTypes = {
    cart: PropTypes.arrayOf(PropTypes.object),
    cartTotalPrice: PropTypes.number,
  };

  static defaultProps = {
    cart: [],
    cartTotalPrice: 0,
  };

  constructor(props) {
    super(props);

    this.state = {
      cart: props.cart,
      cartTotalPrice: props.cartTotalPrice,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cart: nextProps.cart,
      cartTotalPrice: nextProps.cartTotalPrice,
    });
  }

  render() {
    return (
      <Popup
        trigger={<Button basic color="blue" size="mini">Cart(<strong>{this.state.cart.length}</strong>)</Button>}
        on="click"
        hideOnScroll
      >
        <Popup.Header>Total Price: ${this.state.cartTotalPrice.toFixed(2)}</Popup.Header>
        <Popup.Content>
          <List celled>
            {map(this.state.cart, (c, i) =>
              <List.Item key={i}>
                ${c.price.toFixed(2)}
                <List.Content>
                  <List.Header>{c.name}</List.Header>
                </List.Content>
              </List.Item>
            )}
          </List>
          <Button color="blue" size="small" fluid>Checkout</Button>
        </Popup.Content>
      </Popup>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  cartTotalPrice: state.cartTotalPrice,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

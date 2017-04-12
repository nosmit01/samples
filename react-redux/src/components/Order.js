import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';
import * as utils from '../utils/Actions';

import Products from './Products';
import ProductExtras from './ProductExtras';

class Order extends Component {
  static propTypes = {
    onAddToCart: PropTypes.func,
    toppings: PropTypes.arrayOf(PropTypes.object),
    toppingCount: PropTypes.number,
  };

  static defaultProps = {
    onAddToCart: (() => {}),
    toppings: [],
    toppingCount: 0,
  };

  constructor(props) {
    super(props);

    this.state = {
      toppings: props.toppings,
      toppingCount: props.toppingCount,
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      toppings: nextProps.toppings,
      toppingCount: nextProps.toppingCount,
    });
  }

  capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width="thirteen">
              <Products />
            </Grid.Column>
            <Grid.Column width="three">
              {this.state.toppings.length > 0 &&
                <ProductExtras />
              }
              {this.state.toppingCount > 0 &&
                <Button primary onClick={() => this.props.onAddToCart()}>Add to Cart</Button>
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  toppings: state.toppings,
  toppingCount: state.toppingCount,
});

const mapDispatchToProps = dispatch => ({
  onAddToCart: () => dispatch(utils.onAddToCart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Order);
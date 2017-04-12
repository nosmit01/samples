import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Header, List, Checkbox } from 'semantic-ui-react';
import { map } from 'lodash';
import * as utils from '../utils/Actions';

class Order extends Component {
  static propTypes = {
    onToggleSelectedTopping: PropTypes.func,
    toppings: PropTypes.arrayOf(PropTypes.object),
    maxToppings: PropTypes.number,
    toppingCount: PropTypes.number,
  };

  static defaultProps = {
    onToggleSelectedTopping: (() => {}),
    toppings: [],
    maxToppings: 0,
    toppingCount: 0,
  };

  constructor(props) {
    super(props);

    this.state = {
      toppings: props.toppings,
      maxToppings: props.maxToppings,
      toppingCount: props.toppingCount,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.maxToppings !== this.state.maxToppings) {
      this.setState({
        toppings: [],
      });
    }

    setTimeout(() => {
      this.setState({
        toppings: nextProps.toppings,
        maxToppings: nextProps.maxToppings,
        toppingCount: nextProps.toppingCount,
      });
    });
  }

  capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

  render() {
    return (
      <div>
        <Header size="medium" textAlign="center">Toppings</Header>
        <List>
          {map(this.state.toppings, (t, j) =>
            <List.Item key={j}>
              <Checkbox
                label={<label>{this.capitalize(t.topping.name)} - ${t.topping.price}</label>}
                defaultChecked={t.selected}
                onClick={() => this.props.onToggleSelectedTopping(t.topping.name)}
                disabled={!t.selected && this.state.maxToppings === this.state.toppingCount}
              />
            </List.Item>
          )}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  toppings: state.toppings,
  maxToppings: state.maxToppings,
  toppingCount: state.toppingCount,
});

const mapDispatchToProps = dispatch => ({
  onToggleSelectedTopping: (topping) => dispatch(utils.onToggleSelectedTopping(topping)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Order);
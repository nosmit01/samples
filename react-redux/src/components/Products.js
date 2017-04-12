import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Image, Card, Button, Header } from 'semantic-ui-react';
import { map } from 'lodash';
import * as utils from '../utils/Actions';
import { endpoint } from '../utils/Services';

import Loader from './Loader';

class Products extends Component {
  static propTypes = {
    onToggleSelectedPizza: PropTypes.func,
    pizzaSizes: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    onToggleSelectedPizza: (() => {}),
    pizzaSizes: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      pizzaSizes: props.pizzaSizes,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pizzaSizes: nextProps.pizzaSizes,
    });
  }

  selectPizza = async (pizza) => {
    try {
      const resp = await endpoint({
        params: {
          query: `
          {
            pizzaSizeByName(name: ${pizza}) {
              maxToppings
              basePrice
              toppings {
                defaultSelected
                topping {
                  name
                  price
                }
              }
            }
          }`,
        },
      });
      this.props.onToggleSelectedPizza(pizza, resp.pizzaSizeByName);
    } catch (err) {
      // todo
    }
  };

  render() {
    const styles = {
      selected: {
        border: '3px solid #54c8ff',
      },
      deselected: {
        border: 'none',
      },
    };

    return (
      <div>
        {this.state.pizzaSizes.length ? (
          <Card.Group>
            {map(this.state.pizzaSizes, (p, i) =>
              <Card key={i} style={p.selected ? styles.selected : styles.deselected}>
                <Card.Content>
                  <Card.Header>
                    {p.name.toUpperCase()}
                  </Card.Header>
                  <Card.Meta>
                    ${p.basePrice}
                  </Card.Meta>
                  <Card.Description>
                    <Image src="http://2.bp.blogspot.com/-Omg_1GwbGMk/VAgdUaxGQsI/AAAAAAAAfaM/m1UN1tLNGGQ/s1600/pizza-hut-cheese-pizza.jpg" />
                  </Card.Description>
                </Card.Content>
                {!p.selected ? (
                  <Card.Content extra>
                    <Button fluid color="orange" onClick={() => this.selectPizza(p.name.toUpperCase())}>
                      Select
                    </Button>
                  </Card.Content>
                ) : (
                  <Header size="small" textAlign="center">Now go forth and choose toppings</Header>
                )}
              </Card>
            )}
          </Card.Group>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pizzaSizes: state.pizzaSizes,
});

const mapDispatchToProps = dispatch => ({
  onToggleSelectedPizza: (pizza, toppings) => dispatch(utils.onToggleSelectedPizza(pizza, toppings)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Products);
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Container } from 'semantic-ui-react';
import { endpoint } from '../utils/Services';
import * as utils from '../utils/Actions';

import Header from './Header';

class App extends Component {
  static propTypes = {
    onInit: PropTypes.func,
  };

  static defaultProps = {
    onInit: (() => {}),
  };

  componentDidMount() {
    this.getInitData();
  }

  getInitData = async () => {
    try {
      const resp = await endpoint({
        params: {
          query: `
          {
            pizzaSizes {
              name
              maxToppings
              basePrice
            }
          }`,
        },
      });
      this.props.onInit(resp);
    } catch (err) {
      // todo
    }
  };

  render() {
    return (
      <Container fluid>
        <Header />
        <div
          style={{
            margin: '60px 20px 20px',
          }}
        >
          {this.props.children}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  onInit: obj => dispatch(utils.onInit(obj)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

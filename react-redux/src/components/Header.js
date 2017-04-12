import { Grid, Container, Header as SemanticHeader } from 'semantic-ui-react';
import React, { Component } from 'react';

import Cart from './Cart';

export default class Header extends Component {
  render() {
    const styles = {
      base: {
        top: 0,
        color: '#51AFF5',
        zIndex: 1000,
        position: 'absolute',
        maxHeight: 88,
        borderBottom: '1px solid #F13F35',
        background: '#fff',
        padding: '5px 20px',
      },
    };

    return (
      <Container style={styles.base} fluid>
        <Grid columns={2} verticalAlign="middle">
          <Grid.Column width="fourteen">
            <SemanticHeader as="h1">John's Pizza</SemanticHeader>
          </Grid.Column>
          <Grid.Column width="two" textAlign="right">
            <Cart />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

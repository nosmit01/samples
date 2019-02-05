import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import Login from './components/Login'
import CountManager from './components/CountManager'

class App extends Component {
  static propTypes = {
    token: PropTypes.string
  }

  render() {
    return (
      <div style={{
        height: '100%'
      }}>
        {this.props.token ? (
          <CountManager />
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
})

export default connect(mapStateToProps)(App)

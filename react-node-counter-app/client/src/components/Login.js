import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { loginWatcher, setLoggingIn } from '../redux/actions'
import { Segment, Button, Form, Message } from 'semantic-ui-react'

class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    token: PropTypes.string,
    isLoggingIn: PropTypes.bool,
    loginError: PropTypes.string,
    loginWatcher: PropTypes.func,
    setLoggingIn: PropTypes.func
  }

  onSubmit = () => {
    this.props.setLoggingIn()
    this.props.loginWatcher({
      username: this.username.value,
      password: this.password.value
    })
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        height: '100%',
        marginTop: 30
      }}>
        <Segment style={{
          width: 300
        }}>
          <h2>Log in</h2>
          <Form
            error={this.props.loginError !== ''}
            onSubmit={this.onSubmit}
            disabled={this.props.isLoggingIn}
          >
            <Form.Field>
              <input
                ref={input => {
                  this.username = input
                }}
                type="text"
                disabled={this.props.isLoggingIn}
                placeholder="Username"
              />
            </Form.Field>
            <Form.Field>
              <input
                ref={input => {
                  this.password = input
                }}
                type="password"
                disabled={this.props.isLoggingIn}
                placeholder="Password"
              />
            </Form.Field>
            <Button
              type="submit"
              disabled={this.props.isLoggingIn}
              onClick={this.onSubmit}
            >
              {this.props.isLoggingIn ? 'Logging in...' : 'GO'}
            </Button>
            <Message
              error
              header="Error"
              content={this.props.loginError}
            />
          </Form>
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  token: state.token,
  isLoggingIn: state.isLoggingIn,
  loginError: state.loginError
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loginWatcher,
    setLoggingIn
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

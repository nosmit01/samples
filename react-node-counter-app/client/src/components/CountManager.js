import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { countWatcher } from '../redux/actions'
import { Header, Message, Button, Confirm, Divider, Grid, Segment } from 'semantic-ui-react'

class CountManager extends Component {
  static propTypes = {
    count: PropTypes.number,
    token: PropTypes.string,
    countWatcher: PropTypes.func
  }

  state = {
    openPrompt: false,
    confirmIncrement: false,
  }

  promptIncrement = () => {
    this.setState({
      openPrompt: true
    })
  }

  handleConfirm = () =>
    this.setState({
      confirmIncrement: true,
      openPrompt: false
    }, () => {
      this.props.countWatcher(this.props.token, this.props.count)
    })

  handleCancel = () =>
    this.setState({
      confirmIncrement: false,
      openPrompt: false
    })

  confirmContent = () =>
    <Segment style={{
      margin: 20
    }}>
      <Grid columns={2} relaxed='very'>
        <Grid.Column>
          <div style={{
            fontSize: 80,
            textAlign: 'center'
          }}>
            {this.props.count || "0"}
          </div>
        </Grid.Column>
        <Grid.Column>
          <div style={{
            fontSize: 80,
            textAlign: 'center'
          }}>
            {this.props.count === 0 ? 1 : this.props.count * 2}
          </div>
        </Grid.Column>
      </Grid>

      <Divider vertical>becomes</Divider>
    </Segment>

  render() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        marginTop: 30,
      }}>
        <div style={{ width: 500 }}>
          <Header
            as='h2'
            attached='top'
          >
            Count Manager
          </Header>
          <Segment
            attached
            style={{
              fontSize: 100,
              textAlign: 'center',
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 40
            }}
            >
              <span style={{
                fontSize: 24,
                marginBottom: 40
              }}>
                Count:
              </span>
              {this.props.count || "0"}
            </div>
          </Segment>
          <Message
            color="blue"
            attached='bottom'
            style={{
              textAlign: 'right'
            }}
          >
            <Button
              onClick={this.promptIncrement}
            >
              Increment
            </Button>
          </Message>
          <Confirm
            size="tiny"
            open={this.state.openPrompt}
            confirmButton="Confirm"
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm}
            content={this.confirmContent}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  count: state.count,
  token: state.token
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    countWatcher
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CountManager)

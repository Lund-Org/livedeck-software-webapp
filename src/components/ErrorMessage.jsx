import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ErrorMessage extends Component {
  render () {
    return (
      <div className={`message is-danger ${this.props.message.length === 0 ? 'hide' : ''}`}>
        <div className="message-header">
          <p>Error</p>
          <button onClick={this.props.removeError} className="delete" aria-label="delete"></button>
        </div>
        <div className="message-body">{this.props.message}</div>
      </div>
    )
  }
}

ErrorMessage.defaultProps = {
  removeError: () => { },
  message: ''
}

ErrorMessage.propTypes = {
  removeError: PropTypes.func,
  message: PropTypes.string
}

export default ErrorMessage

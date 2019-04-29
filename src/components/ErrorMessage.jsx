import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ErrorMessage extends Component {
  render () {
    return (
      <div className={`notification is-danger ${this.props.message.length === 0 ? 'hide' : ''}`}>
        <button onClick={this.props.removeError} className="delete" aria-label="delete"></button>
        <div>{this.props.message}</div>
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

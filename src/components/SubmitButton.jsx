import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SubmitButton extends Component {
  render () {
    return (
      <div className="input-block button-component">
        <button className="button is-success" onClick={this.props.onSubmit} onTouchEnd={this.props.onSubmit}>{this.props.buttonLabel}</button>
      </div>
    )
  }
}

SubmitButton.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default SubmitButton

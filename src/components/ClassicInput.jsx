import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ClassicInput extends Component {
  constructor (props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
  }

  /**
   * Check if the key pressed is enter
   * @param {Object} event The event object
   */
  submitForm (event) {
    if (event.keyCode === 13) {
      this.props.onSubmit()
    }
  }

  render () {
    return (
      <div className="input-block">
        <div>
          <label>{this.props.label}</label>
        </div>
        <div>
          <input type={this.props.type} value={this.props.value} onKeyDown={this.submitForm} onChange={this.props.onType} />
        </div>
      </div>
    )
  }
}

ClassicInput.defaultProps = {
  type: 'text'
}

ClassicInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onType: PropTypes.func.isRequired
}

export default ClassicInput
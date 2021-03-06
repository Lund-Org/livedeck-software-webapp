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
    const label = this.props.label.length ? (
      <div className="field-label is-normal">
        <label className="label">{this.props.label}</label>
      </div>
    ) : null

    return (
      <div className="input-block classic-input-component field is-horizontal">
        {label}
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input className="input" placeholder={this.props.placeholder}
                type={this.props.type} value={this.props.value}
                onKeyDown={this.submitForm} onChange={this.props.onType} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ClassicInput.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text'
}

ClassicInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onType: PropTypes.func.isRequired
}

export default ClassicInput

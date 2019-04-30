import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Select extends Component {
  constructor (props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
    this.renderOptionList = this.renderOptionList.bind(this)
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

  /**
   * Check if the key pressed is enter
   * @param {Object} event The event object
   */
  renderOptionList () {
    return this.props.values.map((data, index) => {
      return (<option key={index} value={data.value}>{data.label}</option>)
    })
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
              <div className={`select is-${this.props.type}`}>
                <select value={this.props.value} onChange={this.props.onType}>
                  {this.renderOptionList()}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Select.defaultProps = {
  label: '',
  type: 'info'
}

Select.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onType: PropTypes.func.isRequired
}

export default Select

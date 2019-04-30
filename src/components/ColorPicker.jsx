import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SketchPicker } from 'react-color'
import ClickOutsideHook from '../hooks/ClickOutsideHook'

class ColorPicker extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isColorPickerVisible: false
    }
    this.updateStateForColorPicker = this.updateStateForColorPicker.bind(this)
    this.displayDropdown = this.displayDropdown.bind(this)
  }

  updateStateForColorPicker (e) {
    this.props.changeValue({ target: { value: e.hex } })
  }

  displayDropdown (value) {
    return () => {
      this.setState({ isColorPickerVisible: value })
    }
  }

  render () {
    const label = this.props.label.length ? (
      <div className="field-label is-normal">
        <label className="label">{this.props.label}</label>
      </div>
    ) : null

    return (
      <div className={`input-block colorpicker-component field is-horizontal ${(this.state.isColorPickerVisible) ? 'is-open' : ''}`}>
        {label}
        <div className="field-body">
          <div className="field">
            <div className="control">
              <ClickOutsideHook onClick={this.displayDropdown(false)}>
                <div className={`dropdown ${(this.state.isColorPickerVisible) ? 'is-active' : ''}`}>
                  <div className="dropdown-trigger">
                    <input type="text" value={this.props.value}
                      onFocus={this.displayDropdown(true)}
                      onChange={this.props.changeValue} />
                  </div>
                  <div className="dropdown-menu" id="colorpicker-dropdown" role="menu">
                    <div className="dropdown-content">
                      <div className="dropdown-item">
                        <SketchPicker
                          color={this.props.value}
                          onChangeComplete={this.updateStateForColorPicker}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ClickOutsideHook>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ColorPicker.defaultProps = {
  removeError: () => { },
  message: ''
}

ColorPicker.propTypes = {
  removeError: PropTypes.func,
  message: PropTypes.string
}

export default ColorPicker

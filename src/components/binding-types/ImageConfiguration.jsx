import React, { Component } from 'react'
import ClassicInput from '../ClassicInput'

class ImageConfiguration extends Component {
  constructor (props) {
    super(props)

    this.getValue = this.getValue.bind(this)
    this.updateOnType = this.updateOnType.bind(this)
  }

  /**
   * Update a field of the configuration by its key
   * @param {string} key Key in the configuration
   * @return {Function}
   */
  updateOnType (key) {
    return (e) => {
      this.props.onConfigurationUpdate(key)(e.target.value)
    }
  }

  /**
   * Get the value or a default one
   * @param {string} key Key in the configuration
   * @param {mixed} defaultValue The default value if the key is missing from the configuration
   * @return {mixed}
   */
  getValue (key, defaultValue) {
    const value = this.props.binding.configuration[key]
    return (typeof value === 'undefined') ? defaultValue : value
  }

  render () {
    return (
      <div className="image-configuration-component">
        <hr />
        <ClassicInput
          type='text' label='Image Link' value={this.getValue('link', '')}
          onType={this.updateOnType('link')} onSubmit={() => {}}
        />
      </div>
    )
  }
}

ImageConfiguration.type = 'image'

export default ImageConfiguration

import React from 'react'
import ClassicInput from '../components/ClassicInput.jsx'
import SubmitButton from '../components/SubmitButton.jsx'
import ResourceForm from './abstract/ResourceForm.jsx'
import resolveBindingConfiguration from '../helpers/resolveBindingConfiguration'

class UpdateBindingForm extends ResourceForm {
  constructor (props) {
    super(props)

    this.state = {
      name: props.binding.name,
      icon: props.binding.icon,
      configuration: props.binding.configuration.length === 0 ? {} : JSON.parse(props.binding.configuration)
    }

    this.renderConfiguration = this.renderConfiguration.bind(this)
    this.updateConfiguration = this.updateConfiguration.bind(this)
  }

  /**
   * Update values in the configuration
   * @param {string} key The key to update in the configuration
   * @return {Function}
   */
  updateConfiguration (key) {
    return (value) => {
      this.setState({
        configuration: Object.assign({}, this.state.configuration, { [key]: value })
      })
    }
  }

  /**
   * Render the variable configuration part of the form
   * @return {React.Component|null}
   */
  renderConfiguration () {
    return resolveBindingConfiguration(this.props.binding.type, this.state, this.updateConfiguration)
  }

  render () {
    const componentConfiguration = this.renderConfiguration()

    return (
      <div className="update-binding-form">
        <ClassicInput
          type='text' label='Name' value={this.state.name}
          onSubmit={this.submitForm} onType={this.updateState('name')}
        />
        <ClassicInput
          type='text' label='Icon' value={this.state.icon}
          onSubmit={this.submitForm} onType={this.updateState('icon')}
        />
        <div className="configuration-block">{componentConfiguration}</div>
        <div className="has-text-centered">
          <SubmitButton buttonLabel='Update' onSubmit={this.submitForm} />
        </div>
      </div>
    )
  }
}

export default UpdateBindingForm

import React from 'react'
import ClassicInput from '../components/ClassicInput.jsx'
import Select from '../components/Select.jsx'
import SubmitButton from '../components/SubmitButton.jsx'
import CreateResourceForm from './abstract/CreateResourceForm.jsx'

class CreateBindingForm extends CreateResourceForm {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      icon: '',
      type: '',
      weight: 1
    }
    this.bindingsType = [
      { label: 'monType', value: 2 }
    ]
  }

  render () {
    return (
      <div className="create-binding-form">
        <ClassicInput
          type='text' label='Name' value={this.state.name}
          onSubmit={this.submitForm} onType={this.updateState('name')}
        />
        <ClassicInput
          type='text' label='Icon' value={this.state.icon}
          onSubmit={this.submitForm} onType={this.updateState('icon')}
        />
        <Select
          type='info' label='Type' value={this.state.type} values={this.bindingsType}
          onSubmit={this.submitForm} onType={this.updateState('type')}
        />
        <div className="has-text-centered">
          <SubmitButton buttonLabel='Create' onSubmit={this.submitForm} />
        </div>
      </div>
    )
  }
}

export default CreateBindingForm

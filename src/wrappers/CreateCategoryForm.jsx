import React from 'react'
import ClassicInput from '../components/ClassicInput.jsx'
import SubmitButton from '../components/SubmitButton.jsx'
import CreateResourceForm from './abstract/CreateResourceForm.jsx'
import ColorPicker from '../components/ColorPicker.jsx'

class CreateCategoryForm extends CreateResourceForm {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      color: '#FFFFFF',
      weight: 1
    }
  }

  render () {
    return (
      <div className="create-category-form">
        <ClassicInput
          type='text' label='Name' value={this.state.name}
          onSubmit={this.submitForm} onType={this.updateState('name')}
        />
        <ColorPicker label='Color' value={this.state.color}
          changeValue={this.updateState('color')} onSubmit={this.submitForm} />
        <div className="has-text-centered">
          <SubmitButton buttonLabel='Create' onSubmit={this.submitForm} />
        </div>
      </div>
    )
  }
}

export default CreateCategoryForm

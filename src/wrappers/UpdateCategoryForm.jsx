import React from 'react'
import ClassicInput from '../components/ClassicInput.jsx'
import SubmitButton from '../components/SubmitButton.jsx'
import ResourceForm from './abstract/ResourceForm.jsx'
import ColorPicker from '../components/ColorPicker.jsx'

class UpdateCategoryForm extends ResourceForm {
  constructor (props) {
    super(props)

    this.state = {
      name: props.category.name,
      color: props.category.color
    }
  }

  render () {
    return (
      <div className="update-category-form">
        <ClassicInput
          type='text' label='Name' value={this.state.name}
          onSubmit={this.submitForm} onType={this.updateState('name')}
        />
        <ColorPicker label='Color' value={this.state.color}
          changeValue={this.updateState('color')} onSubmit={this.submitForm} />
        <div className="has-text-centered">
          <SubmitButton buttonLabel='Update' onSubmit={this.submitForm} />
        </div>
      </div>
    )
  }
}

export default UpdateCategoryForm

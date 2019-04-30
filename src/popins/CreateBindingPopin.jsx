import React from 'react'
// import LoadingWrapper from '../wrappers/LoadingWrapper'
import PopinWrapper from '../wrappers/PopinWrapper'
import ErrorMessage from '../components/ErrorMessage.jsx'
import CreateBindingForm from '../wrappers/CreateBindingForm.jsx'
// import bindingsAPI from '../api/bindingsAPI'

class CreateBindingPopin extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      formData: {},
      error: ''
    }
    this.removeError = this.removeError.bind(this)
    this.submitBindingCreation = this.submitBindingCreation.bind(this)
  }

  removeError () {
    this.setState({ error: '' })
  }

  submitBindingCreation () {
    console.log(this.state.formData)
  }

  render () {
    return (
      <PopinWrapper popinTitle="Create Binding">
        <ErrorMessage removeError={this.removeError} message={this.state.error} />
        <CreateBindingForm form={this.state.formData} onSubmit={this.submitBindingCreation} />
      </PopinWrapper>
    )
  }
}

export default CreateBindingPopin

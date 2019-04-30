import React from 'react'
// import LoadingWrapper from '../wrappers/LoadingWrapper'
import PopinWrapper from '../wrappers/PopinWrapper'
import ErrorMessage from '../components/ErrorMessage.jsx'
import CreateCategoryForm from '../wrappers/CreateCategoryForm.jsx'
// import bindingsAPI from '../api/bindingsAPI'

class CreateCategoryPopin extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      formData: {},
      error: ''
    }
    this.removeError = this.removeError.bind(this)
    this.submitCategoryCreation = this.submitCategoryCreation.bind(this)
  }

  removeError () {
    this.setState({ error: '' })
  }

  submitCategoryCreation () {
    console.log(this.state.formData)
  }

  render () {
    return (
      <PopinWrapper popinTitle="Create Category">
        <ErrorMessage removeError={this.removeError} message={this.state.error} />
        <CreateCategoryForm form={this.state.formData} onSubmit={this.submitCategoryCreation} />
      </PopinWrapper>
    )
  }
}

export default CreateCategoryPopin

import React from 'react'
// import LoadingWrapper from '../wrappers/LoadingWrapper'
import PopinWrapper from '../wrappers/PopinWrapper'
import ErrorMessage from '../components/ErrorMessage.jsx'
import CreateBindingForm from '../wrappers/CreateBindingForm.jsx'
import bindingsAPI from '../api/bindingsAPI'
import EditPopinManagementContext from '../contexts/EditPopinManagementContext'
import EditContext from '../contexts/EditContext'

class CreateBindingPopin extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      error: '',
      isLoading: false
    }
    this.removeError = this.removeError.bind(this)
    this.submitBindingCreation = this.submitBindingCreation.bind(this)
  }

  /**
   * Remove the error of the popin
   */
  removeError () {
    this.setState({ error: '' })
  }

  /**
   * Submit the form on the binding popin creation
   */
  submitBindingCreation (editPopinManagementContext) {
    return (formData) => {
      this.setState({ error: '', isLoading: true })
      bindingsAPI.createBinding(
        this.context.user.data.key,
        Object.assign({}, formData, { weight: this.context.bindings.data.length })
      ).then((newBinding) => {
        this.context.bindings.updateBindings(this.context.bindings.data.concat([ newBinding.body ]))
        this.setState({ error: '', isLoading: false })
        editPopinManagementContext.trigger(null)
      }).catch((e) => {
        console.log(e)
        this.setState({ error: 'error to do', isLoading: false })
      })
    }
  }

  render () {
    return (
      <PopinWrapper popinTitle="Create Binding">
        <ErrorMessage removeError={this.removeError} message={this.state.error} />
        <EditPopinManagementContext.Consumer>
          {(ctx) => {
            return <CreateBindingForm onSubmit={this.submitBindingCreation(ctx)} />
          }}
        </EditPopinManagementContext.Consumer>
      </PopinWrapper>
    )
  }
}

CreateBindingPopin.contextType = EditContext

export default CreateBindingPopin

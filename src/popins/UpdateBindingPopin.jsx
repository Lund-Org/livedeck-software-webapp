import React from 'react'
import LoadingWrapper from '../wrappers/LoadingWrapper'
import PopinWrapper from '../wrappers/PopinWrapper'
import ErrorMessage from '../components/ErrorMessage.jsx'
import UpdateBindingForm from '../wrappers/UpdateBindingForm.jsx'
import bindingsAPI from '../api/bindingsAPI'
import EditPopinManagementContext from '../contexts/EditPopinManagementContext'
import EditContext from '../contexts/EditContext'

class UpdateBindingPopin extends React.Component {
  constructor (props, context) {
    super(props)

    this.state = {
      error: '',
      isLoading: true,
      binding: null
    }

    bindingsAPI.getBinding(context.user.data.key, props.bindingId).then((binding) => {
      this.setState({ binding: binding.body, isLoading: false })
    }).catch((e) => {
      console.log(e)
      this.setState({ error: 'An error occured : Can\'t retrieve the binding', isLoading: true })
    })

    this.removeError = this.removeError.bind(this)
    this.submitBindingUpdate = this.submitBindingUpdate.bind(this)
  }

  removeError () {
    this.setState({ error: '' })
  }

  /**
   * Submit the form of the binding update
   * @param {Object} editPopinManagementContext The popin context
   * @return {Function}
   */
  submitBindingUpdate (editPopinManagementContext) {
    return (formData) => {
      bindingsAPI.updateBinding(
        this.context.user.data.key,
        { ...formData, id: this.state.binding.id }
      ).then((bindingResult) => {
        const binding = bindingResult.body

        this.context.bindings.updateBindings(this.context.bindings.data.map((contextBinding) => {
          if (contextBinding.id === this.props.bindingId) {
            return binding
          } else {
            return contextBinding
          }
        }))
        editPopinManagementContext.trigger(null)
      }).catch((e) => {
        console.log(e)
        this.setState({ error: 'error to do', isLoading: false })
      })
    }
  }

  render () {
    let content = null

    if (this.state.isLoading) {
      content = <LoadingWrapper color="#61DAFB" />
    } else {
      content = (
        <EditPopinManagementContext.Consumer>
          {(ctx) => {
            return (
              <UpdateBindingForm binding={this.state.binding} onSubmit={this.submitBindingUpdate(ctx)} />
            )
          }}
        </EditPopinManagementContext.Consumer>
      )
    }

    return (
      <PopinWrapper popinTitle="Update Binding">
        <ErrorMessage removeError={this.removeError} message={this.state.error} />
        {content}
      </PopinWrapper>
    )
  }
}

UpdateBindingPopin.contextType = EditContext

export default UpdateBindingPopin

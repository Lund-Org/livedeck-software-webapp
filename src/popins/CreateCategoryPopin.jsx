import React from 'react'
// import LoadingWrapper from '../wrappers/LoadingWrapper'
import PopinWrapper from '../wrappers/PopinWrapper'
import ErrorMessage from '../components/ErrorMessage.jsx'
import CreateCategoryForm from '../wrappers/CreateCategoryForm.jsx'
import categoriesAPI from '../api/categoriesAPI'
import EditPopinManagementContext from '../contexts/EditPopinManagementContext'
import EditContext from '../contexts/EditContext'

class CreateCategoryPopin extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      error: '',
      isLoading: false
    }
    this.removeError = this.removeError.bind(this)
    this.submitCategoryCreation = this.submitCategoryCreation.bind(this)
  }

  removeError () {
    this.setState({ error: '' })
  }

  /**
   * Submit the form on the binding popin creation
   */
  submitCategoryCreation (editPopinManagementContext) {
    return (formData) => {
      this.setState({ error: '', isLoading: true })
      categoriesAPI.createCategory(
        this.context.user.data.key,
        Object.assign({}, formData, { weight: this.context.categories.data.length })
      ).then((newCategory) => {
        this.context.categories.updateCategories(this.context.categories.data.concat([newCategory.body]))
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
      <PopinWrapper popinTitle="Create Category">
        <ErrorMessage removeError={this.removeError} message={this.state.error} />
        <EditPopinManagementContext.Consumer>
          {(ctx) => {
            return <CreateCategoryForm onSubmit={this.submitCategoryCreation(ctx)} />
          }}
        </EditPopinManagementContext.Consumer>
      </PopinWrapper>
    )
  }
}

CreateCategoryPopin.contextType = EditContext

export default CreateCategoryPopin

import React from 'react'
import LoadingWrapper from '../wrappers/LoadingWrapper'
import PopinWrapper from '../wrappers/PopinWrapper'
import ErrorMessage from '../components/ErrorMessage.jsx'
import UpdateCategoryForm from '../wrappers/UpdateCategoryForm.jsx'
import BindingsCategory from '../components/BindingsCategory.jsx'
import categoriesAPI from '../api/categoriesAPI'
import EditPopinManagementContext from '../contexts/EditPopinManagementContext'
import EditContext from '../contexts/EditContext'
import arrayHelper from '../helpers/arrayHelper'

class UpdateCategoryPopin extends React.Component {
  constructor (props, context) {
    super(props)

    this.state = {
      error: '',
      isLoading: true,
      category: null,
      bindingIdsToRemove: []
    }

    categoriesAPI.getCategory(context.user.data.key, props.categoryId).then((category) => {
      this.setState({ category: category.body, isLoading: false })
      this.updateAppCategory(category.body)
    }).catch((e) => {
      console.log(e)
      this.setState({ error: 'An error occured : Can\'t retrieve the category', isLoading: true })
    })

    this.getFilteredBindings = this.getFilteredBindings.bind(this)
    this.removeError = this.removeError.bind(this)
    this.storeBindingToRemove = this.storeBindingToRemove.bind(this)
    this.submitCategoryUpdate = this.submitCategoryUpdate.bind(this)
  }

  removeError () {
    this.setState({ error: '' })
  }

  /**
   * Get the category bindings without the artificial deletions
   * @return {Array}
   */
  getFilteredBindings () {
    if (typeof this.state.category.bindings === 'undefined') {
      return []
    }
    return this.state.category.bindings.filter((binding) => {
      return !(this.state.bindingIdsToRemove.includes(binding.id))
    })
  }

  /**
   * Submit the form on the binding popin creation
   * @param {number} bindingId The id of the binding to remove
   */
  storeBindingToRemove (bindingId) {
    return () => {
      this.setState({ bindingIdsToRemove: arrayHelper.addUniqueId(this.state.bindingIdsToRemove, bindingId) })
    }
  }

  /**
   * Update a category in the app state
   * @param {Object} category The category to update
   */
  updateAppCategory (category) {
    this.context.categories.updateCategories(this.context.categories.data.map((contextCategory) => {
      if (contextCategory.id === this.props.categoryId) {
        return category
      } else {
        return contextCategory
      }
    }))
  }

  /**
   * Submit the form of the category update
   * @param {Object} editPopinManagementContext The popin context
   * @return {Function}
   */
  submitCategoryUpdate (editPopinManagementContext) {
    return (formData) => {
      const promiseArray = []

      this.setState({ error: '', isLoading: true })
      this.state.bindingIdsToRemove.forEach((bindingIdToRemove) => {
        promiseArray.push(
          categoriesAPI.removeBinding(this.context.user.data.key, this.state.category.id, bindingIdToRemove)
        )
      })
      promiseArray.push(
        categoriesAPI.updateCategory(this.context.user.data.key, { ...formData, id: this.state.category.id })
      )

      Promise.all(promiseArray).then(() => {
        const category = { ...formData, id: this.state.category.id }
        category.bindings = this.getFilteredBindings()
        this.updateAppCategory(category)
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
              <div className="columns is-mobile">
                <div className="column is-6">
                  <UpdateCategoryForm category={this.state.category} onSubmit={this.submitCategoryUpdate(ctx)} />
                </div>
                <div className="column is-6">
                  <BindingsCategory bindings={this.getFilteredBindings()} onDeletion={this.storeBindingToRemove} />
                </div>
              </div>
            )
          }}
        </EditPopinManagementContext.Consumer>
      )
    }

    return (
      <PopinWrapper popinTitle="Update Category">
        <ErrorMessage removeError={this.removeError} message={this.state.error} />
        {content}
      </PopinWrapper>
    )
  }
}

UpdateCategoryPopin.contextType = EditContext

export default UpdateCategoryPopin

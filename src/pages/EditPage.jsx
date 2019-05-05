import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
// import LoadingWrapper from '../wrappers/LoadingWrapper'
import BindingsWrapper from '../wrappers/BindingsWrapper'
import CategoriesWrapper from '../wrappers/CategoriesWrapper'
import dndProcessor from '../helpers/dndProcessor'
import bindingsAPI from '../api/bindingsAPI'
import categoriesAPI from '../api/categoriesAPI'
import resolvePopin from '../helpers/resolvePopin'
import EditContext from '../contexts/EditContext'
import EditPopinManagementContext from '../contexts/EditPopinManagementContext'
import { POPIN_MAPPING } from '../constants/popin'
import BackHome from '../components/BackHome'
import DisconnectButton from '../components/DisconnectButton'

class EditPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      popin: {
        data: null,
        updatePopin: (popinValue) => {
          this.setState({ popin: { data: popinValue, updatePopin: this.state.updatePopin } })
          if (popinValue === null) {
            this.callback = null
          }
        }
      }
    }
    this.callback = null
    this.contextParams = {
      data: POPIN_MAPPING,
      trigger: this.state.popin.updatePopin,
      executeCallback: () => {
        return this.callback(this.context.user.data.key)
      },
      attachCallback: (value) => {
        this.callback = value
      }
    }
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  /**
   * Reorder the data locally and remotely
   * @param {Object} event The event of dnd
   * @param {Array} resources The array of resources to reorder
   * @param {Object} dataContext Additional informations to update the selected resource
   */
  reorderResource (event, resources, dataContext) {
    const result = dndProcessor.sortList(event, resources.data)

    resources[dataContext.updateResources](result.orderedList)
    dataContext.resourceAPI(this.context.user.data.key, result.itemUpdated)
  }

  /**
   * Callback of the DragDropContext
   * @param {Object} event The event when a draggable item is dropped
   */
  onDragEnd (event) {
    const source = event.source
    const destination = event.destination
    const bindings = this.context.bindings
    const categories = this.context.categories

    if (!destination) {
      return
    }
    if (!(source.index === destination.index && source.droppableId === destination.droppableId)) {
      if (event.type === 'binding' && event.destination.droppableId === 'binding-droppable') {
        this.reorderResource(event, bindings, {
          updateResources: 'updateBindings', resourceAPI: bindingsAPI.updateBinding
        })
      } else if (event.type === 'category') {
        this.reorderResource(event, categories, {
          updateResources: 'updateCategories', resourceAPI: categoriesAPI.updateCategory
        })
      } else if (event.type === 'binding') {
        const assignmentData = dndProcessor.assignBindingToCategory(event, bindings.data, categories.data)

        if (assignmentData) {
          categoriesAPI.addBinding(this.context.user.data.key, assignmentData.categoryId, assignmentData.bindingId)
          categories.updateCategories(assignmentData.categories)
        }
      }
    }
  }

  render () {
    const popin = resolvePopin(this.state.popin.data, this.state, this.contextParams)

    return (
      <React.Fragment>
        <BackHome />
        <DisconnectButton user={this.context.user} />
        <div className="page edit-page">
          <EditPopinManagementContext.Provider value={this.contextParams}>
            <div className="edit-page-container columns is-multiline">
              <DragDropContext onDragEnd={this.onDragEnd}>
                <BindingsWrapper bindings={this.context.bindings.data} />
                <CategoriesWrapper categories={this.context.categories.data} />
              </DragDropContext>
            </div>
            {popin}
          </EditPopinManagementContext.Provider>
        </div>
      </React.Fragment>
    )
  }
}

EditPage.contextType = EditContext

export default EditPage

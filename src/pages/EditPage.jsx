import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
// import LoadingWrapper from '../wrappers/LoadingWrapper'
import BindingsWrapper from '../wrappers/BindingsWrapper'
import CategoriesWrapper from '../wrappers/CategoriesWrapper'
import dndProcessor from '../helpers/dndProcessor'
import bindingsAPI from '../api/bindingsAPI'
import categoriesAPI from '../api/categoriesAPI'
import resolvePopin from '../helpers/resolvePopin'
import EditPageContext from '../contexts/EditPageContext'
import { POPIN_MAPPING } from '../constants/popin'

class EditPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      popin: {
        data: null,
        updatePopin: (popinValue) => {
          this.setState({ popin: { data: popinValue, updatePopin: this.state.updatePopin } })
        }
      }
    }
    this.contextParams = { data: POPIN_MAPPING, trigger: this.state.popin.updatePopin }
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
    dataContext.resourceAPI(this.props.user.data.key, result.itemUpdated)
  }

  /**
   * Callback of the DragDropContext
   * @param {Object} event The event when a draggable item is dropped
   */
  onDragEnd (event) {
    const source = event.source
    const destination = event.destination
    const bindings = this.props.bindings
    const categories = this.props.categories

    if (!(source.index === destination.index && source.droppableId === destination.droppableId)) {
      if (event.type === 'binding' && event.destination.droppableId === 'binding-droppable') {
        this.reorderBinding(event, bindings, {
          updateResources: 'updateBindings', resourceAPI: bindingsAPI.updateBinding
        })
      } else if (event.type === 'category') {
        this.reorderCategory(event, categories, {
          updateResources: 'updateCategories', resourceAPI: categoriesAPI.updateCategory
        })
      } else if (event.type === 'binding') {
        const assignmentData = dndProcessor.assignBindingToCategory(event, bindings.data, categories.data)

        if (assignmentData) {
          categoriesAPI.addBinding(this.props.user.data.key, assignmentData.bindingId, assignmentData.categoryId)
          categories.updateCategories(assignmentData.categories)
        }
      }
    }
  }

  render () {
    const popin = resolvePopin(this.state.popin.data, this.state)

    return (
      <div className="page edit-page">
        <EditPageContext.Provider value={this.contextParams}>
          <div className="edit-page-container columns is-multiline">
            <DragDropContext onDragEnd={this.onDragEnd}>
              <BindingsWrapper bindings={this.props.bindings.data} />
              <CategoriesWrapper categories={this.props.categories.data} />
            </DragDropContext>
          </div>
          {popin}
        </EditPageContext.Provider>
      </div>
    )
  }
}

export default EditPage

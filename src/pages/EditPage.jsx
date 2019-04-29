import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
// import LoadingWrapper from '../wrappers/LoadingWrapper'
import BindingsWrapper from '../wrappers/BindingsWrapper'
import CategoriesWrapper from '../wrappers/CategoriesWrapper'
import dndProcessor from '../helpers/dndProcessor'
import bindingsAPI from '../api/bindingsAPI'
import categoriesAPI from '../api/categoriesAPI'

class EditPage extends React.Component {
  constructor (props) {
    super(props)

    this.onDragEnd = this.onDragEnd.bind(this)
  }

  reorderBinding (event, bindings) {
    const result = dndProcessor.sortList(event, bindings.data)

    bindings.updateBindings(result.orderedList)
    bindingsAPI.updateBinding(this.props.user.data.key, result.itemUpdated)
  }

  reorderCategory (event, categories) {
    const result = dndProcessor.sortList(event, categories.data)

    categories.updateCategories(result.orderedList)
    categoriesAPI.updateCategory(this.props.user.data.key, result.itemUpdated)
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
        this.reorderBinding(event, bindings)
      } else if (event.type === 'category') {
        this.reorderCategory(event, categories)
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
    return (
      <div className="page edit-page">
        <div className="edit-page-container columns is-multiline">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <BindingsWrapper bindings={this.props.bindings.data} />
            <CategoriesWrapper categories={this.props.categories.data} />
          </DragDropContext>
        </div>
      </div>
    )
  }
}

export default EditPage

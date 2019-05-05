import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import EditContext from '../contexts/EditContext'
import EditPopinManagementContext from '../contexts/EditPopinManagementContext'
import categoriesAPI from '../api/categoriesAPI'
import { EDIT_CATEGORY_POPIN_IDENTIFIER, DELETE_CONFIRMATION_POPIN_IDENTIFIER } from '../constants/popin'
import processor from '../helpers/processor'

class Category extends Component {
  constructor (props) {
    super(props)

    this.renderCategoryClass = this.renderCategoryClass.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
    this.displayDeleteWarning = this.displayDeleteWarning.bind(this)
  }

  /**
   * The callback on click to display the delete popin
   * @param {Object} editPopinManagementContext The context to manage the popins
   * @return {Function}
   */
  displayDeleteWarning (editPopinManagementContext) {
    return () => {
      editPopinManagementContext.attachCallback(this.deleteCategory(this.props.category.id))
      editPopinManagementContext.trigger(DELETE_CONFIRMATION_POPIN_IDENTIFIER)
    }
  }

  /**
   * The callback on click to display the update popin
   * @param {Object} editPopinManagementContext The context to manage the popins
   * @return {Function}
   */
  displayUpdateCategory (editPopinManagementContext) {
    return () => {
      editPopinManagementContext.attachCallback(() => this.props.category.id)
      editPopinManagementContext.trigger(EDIT_CATEGORY_POPIN_IDENTIFIER)
    }
  }

  /**
   * The callback on delete validation
   * @param {number} id The identifier of the category
   * @return {Function}
   */
  deleteCategory (id) {
    return async (userKey) => {
      try {
        await categoriesAPI.deleteCategory(userKey, id)
        this.context.categories.updateCategories(
          processor.removeItemFromArrayById(this.context.categories.data, id)
        )
      } catch (e) {
        // do shit
        console.log(e)
      }
    }
  }

  /**
   * Render the category class depending on the drag state
   * @param {Object} dragSnapshot The status of the drag item
   */
  renderCategoryClass (dragSnapshot) {
    const isDraging = dragSnapshot.isDragging ? 'is-draging' : ''
    return `category-component box ${isDraging}`
  }

  render () {
    const colorStyle = { borderLeft: `3px solid ${this.props.category.color}` }

    return (
      <Draggable
        key={`category-${this.props.category.id}`}
        draggableId={`category-${this.props.category.id}`}
        index={this.props.category.index}>
        {(provided, snapshot) => (
          <div className={this.renderCategoryClass(snapshot)}
            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
            style={{ ...provided.draggableProps.style, ...colorStyle }}>
            <EditPopinManagementContext.Consumer>
              {(ctx) => {
                return (
                  <div className="columns is-mobile">
                    <div className="column is-10">{this.props.category.name}</div>
                    <div className="column is-1 has-text-centered is-clickable" onClick={this.displayUpdateCategory(ctx)}>
                      <i className="fas fa-cogs"></i>
                    </div>
                    <div className="column is-1 has-text-centered is-clickable" onClick={this.displayDeleteWarning(ctx)}>
                      <i className="far fa-trash-alt"></i>
                    </div>
                  </div>
                )
              }}
            </EditPopinManagementContext.Consumer>
            <Droppable droppableId={`category-${this.props.category.id}-bindings`} type="binding">
              {(dropProvided, dropSnapshot) => (
                <div className={`category-bindings-dropzone ${dropSnapshot.isDraggingOver ? 'is-drag-over' : ''}`} ref={dropProvided.innerRef}>
                  {dropProvided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    )
  }
}

Category.propTypes = {
  category: PropTypes.object.isRequired
}

Category.contextType = EditContext

export default Category

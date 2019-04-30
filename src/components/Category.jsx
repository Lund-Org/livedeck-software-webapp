import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Droppable, Draggable } from 'react-beautiful-dnd'

class Category extends Component {
  render () {
    return (
      <Draggable
        key={`category-${this.props.category.id}`}
        draggableId={`category-${this.props.category.id}`}
        index={this.props.category.index}>
        {(provided, snapshot) => (
          <div className={`category-component box ${snapshot.isDragging ? 'is-draging' : ''}`}
            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
            style={ provided.draggableProps.style }>
            <div className="columns is-mobile">
              <div className="column is-10">{this.props.category.name}</div>
              <div className="column is-1 has-text-centered">
                <i className="fas fa-cogs"></i>
              </div>
              <div className="column is-1 has-text-centered">
                <i className="far fa-trash-alt"></i>
              </div>
            </div>
            <Droppable droppableId={`category-${this.props.category.id}-bindings`} type="binding">
              {(provided, snapshot) => (
                <div className={`category-bindings-dropzone ${snapshot.isDraggingOver ? 'is-drag-over' : ''}`} ref={provided.innerRef}>
                  {provided.placeholder}
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

export default Category

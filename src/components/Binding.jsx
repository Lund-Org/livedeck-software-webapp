import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'

class Binding extends Component {
  render () {
    return (
      <Draggable
        key={`binding-${this.props.binding.id}`}
        draggableId={`binding-${this.props.binding.id}`}
        index={this.props.binding.index}>
        {(provided, snapshot) => (
          <div className={`box binding-component ${snapshot.isDragging ? 'is-draging' : ''}`}
            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
            style={provided.draggableProps.style}>
            <div className="columns is-mobile">
              <div className="column is-10">{this.props.binding.name}</div>
              <div className="column is-1">(i)</div>
              <div className="column is-1">(x)</div>
            </div>
          </div>
        )}
      </Draggable>
    )
  }
}

Binding.propTypes = {
  binding: PropTypes.object.isRequired
}

export default Binding

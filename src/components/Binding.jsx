import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import EditContext from '../contexts/EditContext'
import EditPopinManagementContext from '../contexts/EditPopinManagementContext'
import bindingsAPI from '../api/bindingsAPI'
import { EDIT_BINDING_POPIN_IDENTIFIER, DELETE_CONFIRMATION_POPIN_IDENTIFIER } from '../constants/popin'
import processor from '../helpers/processor'

class Binding extends Component {
  constructor (props) {
    super(props)

    this.deleteBinding = this.deleteBinding.bind(this)
    this.displayUpdateBinding = this.displayUpdateBinding.bind(this)
    this.displayDeleteWarning = this.displayDeleteWarning.bind(this)
  }

  /**
   * The callback on click to display the delete popin
   * @param {Object} editPopinManagementContext The context to manage the popins
   * @return {Function}
   */
  displayDeleteWarning (editPopinManagementContext) {
    return () => {
      editPopinManagementContext.attachCallback(this.deleteBinding(this.props.binding.id))
      editPopinManagementContext.trigger(DELETE_CONFIRMATION_POPIN_IDENTIFIER)
    }
  }

  /**
   * The callback on click to display the update popin
   * @param {Object} editPopinManagementContext The context to manage the popins
   * @return {Function}
   */
  displayUpdateBinding (editPopinManagementContext) {
    return () => {
      editPopinManagementContext.attachCallback(() => this.props.binding.id)
      editPopinManagementContext.trigger(EDIT_BINDING_POPIN_IDENTIFIER)
    }
  }

  /**
   * The callback on delete validation
   * @param {number} id The identifier of the binding
   * @return {Function}
   */
  deleteBinding (id) {
    return async (userKey) => {
      try {
        await bindingsAPI.deleteBinding(userKey, id)
        this.context.bindings.updateBindings(
          processor.removeItemFromArrayById(this.context.bindings.data, id)
        )
      } catch (e) {
        // do shit
        console.log(e)
      }
    }
  }

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
            <EditPopinManagementContext.Consumer>
              {(ctx) => {
                return (
                  <div className="columns is-mobile">
                    <div className="column is-10">{this.props.binding.name}</div>
                    <div className="column is-1 has-text-centered is-clickable" onClick={this.displayUpdateBinding(ctx)}>
                      <i className="fas fa-cogs"></i>
                    </div>
                    <div className="column is-1 has-text-centered is-clickable" onClick={this.displayDeleteWarning(ctx)}>
                      <i className="far fa-trash-alt"></i>
                    </div>
                  </div>
                )
              }}
            </EditPopinManagementContext.Consumer>
          </div>
        )}
      </Draggable>
    )
  }
}

Binding.propTypes = {
  binding: PropTypes.object.isRequired
}

Binding.contextType = EditContext

export default Binding

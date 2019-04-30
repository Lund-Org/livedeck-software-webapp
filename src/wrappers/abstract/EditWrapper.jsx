import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import ClassicInput from '../../components/ClassicInput'
import Button from '../../components/Button'

class EditWrapper extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      searchValue: ''
    }
    this.setFilterValue = this.setFilterValue.bind(this)
    this.renderResource = this.renderResource.bind(this)
  }

  /**
   * Callback when someone types
   * @param {Object} event The event on key pressed
   */
  setFilterValue (event) {
    this.setState({ searchValue: event.target.value })
  }

  /**
   * Render the list of bindings
   * @return {Array<Binding>}
   */
  renderResource (collection, callbackResourceGenerator) {
    const resources = []
    const regex = new RegExp(this.state.searchValue, 'i')

    collection.forEach((resource) => {
      if (resource.name.match(regex)) {
        resources.push(callbackResourceGenerator(resources, resource))
      }
    })

    return resources
  }

  /**
   * xxx
   * @return {Array<Binding>}
   */
  renderDroppableArea (resourceName, resourceList) {
    return (
      <Droppable droppableId={`${resourceName}-droppable`} type={`${resourceName}`}>
        {(provided, snapshot) => (
          <div className={`${resourceName}-droppable ${snapshot.isDraggingOver ? 'is-drag-hover' : ''}`} ref={provided.innerRef}>
            {resourceList}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    )
  }

  /**
   * xxx
   * @return {Array<Binding>}
   */
  renderFooterActions (buttonType, actionCode) {
    return (
      <div className="footerActions">
        <div className="field">
          <ClassicInput type="text" placeholder="Filter" value={this.state.searchValue}
            onSubmit={() => { }} onType={this.setFilterValue} />
        </div>
        <div>
          <Button buttonType={buttonType} className={`is-fullwidth`} actionCode={actionCode} label="+" />
        </div>
      </div>
    )
  }
}

export default EditWrapper

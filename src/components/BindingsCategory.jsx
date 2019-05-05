import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BindingsCategory extends Component {
  constructor (props) {
    super(props)

    this.renderBindings = this.renderBindings.bind(this)
  }

  renderBindings () {
    return this.props.bindings.map((binding, index) => {
      return (
        <div key={index} className="category-binding">
          <div className="columns is-mobile">
            <div className="column is-11">{binding.name}</div>
            <div className="column is-1 has-text-centered is-clickable" onClick={this.props.onDeletion(binding.id)}>
              <i className="far fa-trash-alt"></i>
            </div>
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div className="category-binding-list">
        {this.renderBindings()}
      </div>
    )
  }
}

BindingsCategory.propTypes = {
  bindings: PropTypes.array.isRequired,
  onDeletion: PropTypes.func.isRequired
}

export default BindingsCategory

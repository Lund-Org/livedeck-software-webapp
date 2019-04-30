import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EditPageContext from '../contexts/EditPageContext'

class Button extends Component {
  constructor (props) {
    super(props)

    this.trigger = this.trigger.bind(this)
  }

  /**
   * Trigger an action on click
   */
  trigger () {
    if (this.context.trigger && this.props.actionCode) {
      this.context.trigger(this.context.data[this.props.actionCode])
    }
  }

  render () {
    return (
      <a className={`button is-large is-${this.props.buttonType} ${this.props.className}`} onClick={this.trigger}>
        {this.props.label}
      </a>
    )
  }
}

Button.defaultProps = {
  buttonType: 'info',
  className: '',
  actionCode: '',
  label: ''
}

Button.propTypes = {
  buttonType: PropTypes.string,
  className: PropTypes.string,
  actionCode: PropTypes.string,
  label: PropTypes.string
}

Button.contextType = EditPageContext

export default Button

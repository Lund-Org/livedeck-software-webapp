import React, { Component } from 'react'
import CurrentPageContext from '../contexts/CurrentPageContext'
import { LOGIN_PAGE_IDENTIFIER } from '../constants/page'

class DisconnectButton extends Component {
  constructor (props) {
    super(props)

    this.trigger = this.trigger.bind(this)
  }

  /**
   * Trigger an action on click
   */
  trigger () {
    // send event to electron to remove token
    this.props.user.updateUser(null)
    this.context.updateCurrentPage(LOGIN_PAGE_IDENTIFIER)
  }

  render () {
    return (
      <a className={`disconnect-button-component button is-danger`} onClick={this.trigger}>
        <i className="fas fa-sign-in-alt"></i>
      </a>
    )
  }
}

DisconnectButton.contextType = CurrentPageContext

export default DisconnectButton

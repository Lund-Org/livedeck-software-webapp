import React, { Component } from 'react'
import CurrentPageContext from '../contexts/CurrentPageContext'
import { HOME_PAGE_IDENTIFIER } from '../constants/page'

class BackHome extends Component {
  constructor (props) {
    super(props)

    this.trigger = this.trigger.bind(this)
  }

  /**
   * Trigger an action on click
   */
  trigger () {
    this.context.updateCurrentPage(HOME_PAGE_IDENTIFIER)
  }

  render () {
    return (
      <a className={`back-home-component button is-warning`} onClick={this.trigger}>
        <i className="fas fa-chevron-left"></i>
      </a>
    )
  }
}

BackHome.contextType = CurrentPageContext

export default BackHome

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CurrentPageContext from '../contexts/CurrentPageContext'

class Link extends Component {
  constructor (props) {
    super(props)

    this.redirect = this.redirect.bind(this)
  }

  /**
   * Change the page of the app
   */
  redirect () {
    this.context.updateCurrentPage(this.props.redirectPage)
  }

  render () {
    return (
      <div className={this.props.className}>
        <a href='#' onClick={this.redirect}>{this.props.label}</a>
      </div>
    )
  }
}

Link.defaultProps = {
  className: ''
}

Link.propTypes = {
  redirectPage: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

Link.contextType = CurrentPageContext

export default Link

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
    this.props.preClick()
    if (this.props.delay) {
      setTimeout(() => {
        this.context.updateCurrentPage(this.props.redirectPage)
      }, this.props.delay)
    } else {
      this.context.updateCurrentPage(this.props.redirectPage)
    }
  }

  render () {
    return (
      <div className={`link-component ${this.props.className}`}>
        <a href='#' onClick={this.redirect}>{this.props.label}</a>
      </div>
    )
  }
}

Link.defaultProps = {
  preClick: () => {},
  className: '',
  delay: 0
}

Link.propTypes = {
  preClick: PropTypes.func,
  redirectPage: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  delay: PropTypes.number
}

Link.contextType = CurrentPageContext

export default Link

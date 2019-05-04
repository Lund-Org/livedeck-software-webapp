import React from 'react'
import PropTypes from 'prop-types'
// import LoadingWrapper from '../wrappers/LoadingWrapper'
import EditPopinManagementContext from '../contexts/EditPopinManagementContext'

class PopinWrapper extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      formData: {}
    }
    this.closePopin = this.closePopin.bind(this)
  }

  closePopin () {
    this.context.trigger(null)
  }

  render () {
    return (
      <div className="modal popin is-active">
        <div className="modal-background" onClick={this.closePopin}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{this.props.popinTitle}</p>
            <button className="delete" aria-label="close" onClick={this.closePopin}></button>
          </header>
          <section className="modal-card-body">
            {this.props.children}
          </section>
        </div>
      </div>
    )
  }
}

PopinWrapper.propTypes = {
  popinTitle: PropTypes.string
}

PopinWrapper.contextType = EditPopinManagementContext

export default PopinWrapper

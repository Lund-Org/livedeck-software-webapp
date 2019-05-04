import React from 'react'
import PopinWrapper from '../wrappers/PopinWrapper'
import EditPopinManagementContext from '../contexts/EditPopinManagementContext'

class DeleteWarningPopin extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isProcessing: false
    }
    this.executeDeleteCallback = this.executeDeleteCallback.bind(this)
  }

  /**
   * Execute the callback assigned on delete validation
   */
  executeDeleteCallback () {
    this.setState({ isProcessing: true })
    this.context.executeCallback().then(() => {
      this.setState({ isProcessing: false })
      this.context.trigger(null)
    }).catch((e) => {
      console.log(e)
      this.setState({ isProcessing: false })
      this.context.trigger(null)
    })
  }

  render () {
    return (
      <PopinWrapper popinTitle="Are you sure ?">
        <div className='has-text-centered'>
          <a className={`button is-danger ${this.state.isProcessing ? 'is-loading' : ''}`}
            onClick={this.executeDeleteCallback}>Delete</a>
        </div>
      </PopinWrapper>
    )
  }
}

DeleteWarningPopin.contextType = EditPopinManagementContext

export default DeleteWarningPopin

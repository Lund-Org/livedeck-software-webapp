import React from 'react'
import PropTypes from 'prop-types'

class ResourceForm extends React.Component {
  constructor (props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
    this.updateState = this.updateState.bind(this)
  }

  /**
   * Common method to update field in the state
   * @param {string} key The key in the state
   */
  updateState (key) {
    return (event) => {
      this.setState({ [key]: event.target.value })
    }
  }

  /**
   * Common method to update field in the state
   */
  submitForm () {
    this.props.onSubmit(Object.assign({}, this.state))
  }
}

ResourceForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default ResourceForm

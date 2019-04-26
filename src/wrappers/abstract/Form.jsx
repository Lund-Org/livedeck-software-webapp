import React from 'react'
import PropTypes from 'prop-types'

class Form extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

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
   * @param {string} key The key in the state
   */
  submitForm () {
    this.props.onSubmit({
      username: this.state.username,
      password: this.state.password
    })
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default Form

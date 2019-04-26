import React from 'react'
import { ERROR_REGISTER_MESSAGE } from '../constants/error'
import userAPI from '../api/userAPI'
import RegisterForm from '../wrappers/RegisterForm'
import LoadingWrapper from '../wrappers/LoadingWrapper'
import FormPage from './abstract/FormPage'

class RegisterPage extends FormPage {
  constructor (props) {
    super(props)

    this.submitForm = this.submitForm.bind(this)
  }

  /**
   * Try to log the user with the informations of the payload
   * @param {Object} data The data to log in
   */
  async submitForm (data) {
    this.setState({ isLoading: true })
    try {
      await userAPI.register(data)
      await this.authenticateUser(data)
    } catch (e) {
      this.setState({ isLoading: false, error: ERROR_REGISTER_MESSAGE })
    }
  }

  render () {
    return (
      <div className="register-page">
        <h1>Register page</h1>
        <p>{this.state.error}</p>
        <RegisterForm onSubmit={this.submitForm} />
        <div className={this.state.isLoading ? null : 'hide'}>
          <LoadingWrapper background="rgba(0, 0, 0, 0.3)" color="#61DAFB" />
        </div>
      </div>
    )
  }
}

export default RegisterPage

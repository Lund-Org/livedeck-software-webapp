import React from 'react'
import { ERROR_REGISTER_MESSAGE } from '../constants/error'
import userAPI from '../api/userAPI'
import RegisterForm from '../wrappers/RegisterForm'
import LoadingWrapper from '../wrappers/LoadingWrapper'
import FormPage from './abstract/FormPage'
import ErrorMessage from '../components/ErrorMessage.jsx'

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
      <div className="page register-page">
        <div className={`register-page-container ${this.state.out ? 'page-container-out' : ''}`}>
          <h1 className="title">Register page</h1>
          <ErrorMessage removeError={this.removeError} message={this.state.error} />
          <RegisterForm onSubmit={this.submitForm} outAnimationSetter={this.setOut} />
          <div className={this.state.isLoading ? null : 'unvisible'}>
            <LoadingWrapper background="rgba(0, 0, 0, 0.7)" color="#61DAFB" />
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterPage

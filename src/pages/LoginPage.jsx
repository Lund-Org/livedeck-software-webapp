import React from 'react'
import LoginForm from '../wrappers/LoginForm'
import LoadingWrapper from '../wrappers/LoadingWrapper'
import FormPage from './abstract/FormPage'
import ErrorMessage from '../components/ErrorMessage.jsx'

class LoginPage extends FormPage {
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
    await this.authenticateUser(data)
  }

  render () {
    return (
      <div className="page login-page">
        <div className={`login-page-container ${this.state.out ? 'page-container-out' : ''}`}>
          <h1 className="title">Login page</h1>
          <ErrorMessage removeError={this.removeError} message={this.state.error} />
          <LoginForm onSubmit={this.submitForm} outAnimationSetter={this.setOut} />
          <div className={this.state.isLoading ? null : 'unvisible'}>
            <LoadingWrapper background="rgba(0, 0, 0, 0.7)" color="#61DAFB" />
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage

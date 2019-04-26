import React from 'react'
import LoginForm from '../wrappers/LoginForm'
import LoadingWrapper from '../wrappers/LoadingWrapper'
import FormPage from './abstract/FormPage'

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
      <div className="login-page">
        <h1>Login page</h1>
        <p>{this.state.error}</p>
        <LoginForm onSubmit={this.submitForm} />
        <div className={this.state.isLoading ? null : 'hide'}>
          <LoadingWrapper background="rgba(0, 0, 0, 0.3)" color="#61DAFB" />
        </div>
      </div>
    )
  }
}

export default LoginPage

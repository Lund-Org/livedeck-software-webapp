import React from 'react'
import ClassicInput from '../components/ClassicInput.jsx'
import Link from '../components/Link.jsx'
import SubmitButton from '../components/SubmitButton.jsx'
import Form from './abstract/Form.jsx'
import {
  REGISTER_PAGE_IDENTIFIER
  // RESET_PASSWORD_PAGE_IDENTIFIER
} from '../constants/page'

class LoginForm extends Form {
  render () {
    return (
      <div className="login-form">
        <ClassicInput
          type='text' label='username' value={this.state.username}
          onSubmit={this.submitForm} onType={this.updateState('username')}
        />
        <ClassicInput
          type='password' label='password' value={this.state.password}
          onSubmit={this.submitForm} onType={this.updateState('password')}
        />
        <SubmitButton buttonLabel='Login' onSubmit={this.submitForm} />
        <div>
          <Link redirectPage={REGISTER_PAGE_IDENTIFIER} label="Register" />
          {/* <Link redirectPage={RESET_PASSWORD_PAGE_IDENTIFIER} label="Forget Password ?" /> */}
        </div>
      </div>
    )
  }
}

export default LoginForm

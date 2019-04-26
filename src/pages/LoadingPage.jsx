import React, { Component } from 'react'
import {
  LOGIN_PAGE_IDENTIFIER,
  HOME_PAGE_IDENTIFIER
} from '../constants/page'
import { ERROR_WEBSOCKET_CONNECTION_MESSAGE } from '../constants/error'
import userAPI from '../api/userAPI'
import LoadingWrapper from '../wrappers/LoadingWrapper.jsx'

class LoadingPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      errorMessage: null
    }

    this.warnSoftwareAndRedirectToLogin = this.warnSoftwareAndRedirectToLogin.bind(this)
    this.startWebsocket = this.startWebsocket.bind(this)

    this.initApp()
  }

  initApp () {
    document.addEventListener('livedeck-user-loaded', (userData) => {
      if (!userData.data || typeof userData.data === 'undefined') {
        this.startWebsocket(null)
      } else {
        if (typeof userData.data === 'string') {
          userAPI.authByToken(userData.data, (err, res) => {
            if (err) {
              this.warnSoftwareAndRedirectToLogin()
            } else {
              // set user of the App
              this.startWebsocket(res.body.user)
            }
          })
        } else {
          this.warnSoftwareAndRedirectToLogin()
        }
      }
    })

    document.dispatchEvent(new window.Event('livedeck-app-ready'))
  }

  /**
   * Warn the electron app that the token stored is invalid and redirect to the login page
   */
  warnSoftwareAndRedirectToLogin (loadWebsocket = true) {
    document.dispatchEvent(new window.Event('livedeck-token-invalid'))
    if (loadWebsocket) {
      this.startWebsocket(null)
    }
  }

  /**
   * Warn the electron app that the token stored is invalid and redirect to the login page
   */
  startWebsocket (user = null) {
    this.props.websocket.data.connect((err) => {
      if (err) {
        this.setState({
          errorMessage: ERROR_WEBSOCKET_CONNECTION_MESSAGE
        })
        setTimeout(this.startWebsocket, 5000)
      } else {
        this.setState({
          errorMessage: null
        })
        this.props.websocket.data.authenticate(user, (err, res) => {
          if (err) {
            this.warnSoftwareAndRedirectToLogin(false)
            this.props.currentPage.updateCurrentPage(LOGIN_PAGE_IDENTIFIER)
          } else {
            this.props.user.updateUser(res.user)
            this.props.currentPage.updateCurrentPage(HOME_PAGE_IDENTIFIER)
          }
        })
      }
    })
  }

  render () {
    return (
      <div className="loading-page">
        <div className="loading-error-message">{this.state.errorMessage}</div>
        <LoadingWrapper background="rgba(0, 0, 0, 0.3)" color="#61DAFB" />
      </div>
    )
  }
}

export default LoadingPage

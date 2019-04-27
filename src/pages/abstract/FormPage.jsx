import React from 'react'
import {
  HOME_PAGE_IDENTIFIER
} from '../../constants/page'
import {
  ERROR_LOGIN_MESSAGE,
  ERROR_LOGIN_USER_NOT_FOUND_MESSAGE,
  ERROR_LOGIN_FORBIDDEN_MESSAGE
} from '../../constants/error'
import userAPI from '../../api/userAPI'
import categoriesAPI from '../../api/categoriesAPI'
import bindingsAPI from '../../api/bindingsAPI'

class FormPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      // des trucs
      isLoading: false,
      error: '',
      out: false
    }
    this.setOut = this.setOut.bind(this)
    this.removeError = this.removeError.bind(this)
  }

  /**
   * Remove the error displayed
   */
  removeError () {
    this.setState({ error: '' })
  }

  /**
   * Update the out value in the state
   */
  setOut () {
    this.setState({
      out: true
    })
  }

  /**
   * Authenticate the user through the API and the websocket
   * @param {Object} data The payload with the informations to authenticate the user
   */
  async authenticateUser (data) {
    try {
      const user = await userAPI.login(data)
      this.props.websocket.data.authenticate(user.body, (err, res) => {
        if (err) {
          this.setState({ isLoading: false, error: ERROR_LOGIN_MESSAGE })
        } else {
          this.sendTokenToElectron(res.user.token)
          this.setState({ isLoading: false, out: true })
          this.props.user.updateUser(res.user)
          setTimeout(() => {
            this.props.currentPage.updateCurrentPage(HOME_PAGE_IDENTIFIER)
          }, 750)
        }
      })
      await this.getCategories(user.body.key)
      await this.getBindings(user.body.key)
    } catch (e) {
      console.log(e)
      if (e.response.statusCode === 404) {
        this.setState({ isLoading: false, error: ERROR_LOGIN_USER_NOT_FOUND_MESSAGE })
      } else {
        this.setState({ isLoading: false, error: ERROR_LOGIN_FORBIDDEN_MESSAGE })
      }
    }
  }

  /**
   * Send the user token to electron to be stored
   * @param {string} token The token of the user to store (by electron)
   */
  sendTokenToElectron (token) {
    let event = new window.Event('livedeck-set-token')
    event.data = token
    document.dispatchEvent(event)
  }

  /**
   * Retrieves the categories of the user
   * @param {string} userKey The user key which authentify the user
   */
  async getCategories (userKey) {
    try {
      const categories = await categoriesAPI.index(userKey)

      this.props.categories.updateCategories(categories)
    } catch (e) {
      console.log(e)
      if (e.response.statusCode === 404) {
        this.setState({ isLoading: false, error: 'todo' })
      } else {
        this.setState({ isLoading: false, error: 'todo' })
      }
    }
  }

  /**
   * Send the user token to electron to be stored
   * @param {string} userKey The user key which authentify the user
   */
  async getBindings (userKey) {
    try {
      const bindings = await bindingsAPI.index(userKey)

      this.props.bindings.updateBindings(bindings)
    } catch (e) {
      console.log(e)
      if (e.response.statusCode === 404) {
        this.setState({ isLoading: false, error: 'todo' })
      } else {
        this.setState({ isLoading: false, error: 'todo' })
      }
    }
  }
}

export default FormPage

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

class FormPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      // des trucs
      isLoading: false,
      error: ''
    }
  }

  async authenticateUser (data) {
    try {
      const user = await userAPI.login(data)
      this.props.websocket.data.authenticate(user.body, (err, res) => {
        if (err) {
          this.setState({ isLoading: false, error: ERROR_LOGIN_MESSAGE })
        } else {
          // warn electron to save the token
          this.setState({ isLoading: false })
          this.props.user.updateUser(res.user)
          this.props.currentPage.updateCurrentPage(HOME_PAGE_IDENTIFIER)
        }
      })
    } catch (e) {
      if (e.response.statusCode === 404) {
        this.setState({ isLoading: false, error: ERROR_LOGIN_USER_NOT_FOUND_MESSAGE })
      } else {
        this.setState({ isLoading: false, error: ERROR_LOGIN_FORBIDDEN_MESSAGE })
      }
    }
  }
}

export default FormPage

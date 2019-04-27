import React, { Component } from 'react'
import { LOADING_PAGE_IDENTIFIER } from './constants/page'
import resolvePage from './helpers/resolvePage'
import WebsocketManager from './helpers/WebsocketManager'
import { ERROR_APP_WEBSOCKET_DISCONNECTED_MESSAGE } from './constants/error'
import LoadingWrapper from './wrappers/LoadingWrapper.jsx'

class App extends Component {
  constructor (props) {
    super(props)
    let shouldDisplayLoader = false

    this.updateStateKey = this.updateStateKey.bind(this)
    this.state = {
      shouldDisplayLoader,
      user: {
        data: null,
        updateUser: this.updateStateKey('user')
      },
      bindings: {
        data: [],
        updateBindings: this.updateStateKey('bindings')
      },
      categories: {
        data: [],
        updateCategories: this.updateStateKey('categories')
      },
      currentPage: {
        data: LOADING_PAGE_IDENTIFIER,
        updateCurrentPage: this.updateStateKey('currentPage')
      },
      websocket: {
        data: new WebsocketManager((value) => {
          this.setState({ shouldDisplayLoader: value })
        }),
        updateWebsocket: this.updateStateKey('websocket')
      }
    }
    this.previousPageIdentifier = null
    this.page = null
  }

  /**
   * Update a part of the state
   * @param {string} key The key of the entity to update in the state
   * @return {Function}
   */
  updateStateKey (key) {
    return (value) => {
      let oldState = Object.assign({}, this.state[key])

      oldState.data = value
      this.setState({
        [key]: oldState
      })
    }
  }

  render () {
    const websocketLoader = this.state.shouldDisplayLoader ? (
      <div className='app-websocket-loader'>
        <div className='app-websocket-error'>{ERROR_APP_WEBSOCKET_DISCONNECTED_MESSAGE}</div>
        <LoadingWrapper background="rgba(0, 0, 0, 0.3)" color="#61DAFB" />
      </div>
    ) : null

    if (this.previousPage !== this.state.currentPage.data) {
      this.page = resolvePage(this.state.currentPage.data, this.state)
      this.previousPage = this.state.currentPage.data
    }

    return (
      <div className='app'>
        {this.page}
        {websocketLoader}
      </div>
    )
  }
}

export default App

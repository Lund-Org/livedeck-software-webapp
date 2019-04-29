import ioClient from 'socket.io-client'

export default class WebsocketManager {
  constructor (displayLoader) {
    this.io = null
    this.displayLoader = displayLoader
    this.lastToken = null

    this.authenticateCallback = () => {}
  }

  /**
   * Connect the websocket to the server
   * @param {Function} callback The callback to execute after a connection or a failure
   */
  connect (callback) {
    try {
      let interval = null
      let alreadySentCallback = false

      this.io = ioClient(`ws://${global.endpoint}`).on('connect_error', (err) => {
        if (interval) {
          clearInterval(interval)
        }
        if (!alreadySentCallback) {
          callback(err)
        }
      }).on('disconnect', () => {
        this.displayLoader(true)
      }).on('reconnect', () => {
        this.authenticate(this.lastToken, () => {
          this.displayLoader(false)
        })
      })

      interval = setInterval(() => {
        if (this.io.connected) {
          alreadySentCallback = true
          clearInterval(interval)
          callback(null)
        }
      }, 500)
    } catch (e) {
      callback(e)
    }
  }

  /**
   * Proceed the authentication through the websocket
   * @param {Object} user The user data for the authentication
   * @param {Function} _callback The callback to execute. First parameter is the error and the second is the data on success
   */
  authenticate (user, _callback) {
    const successCallback = (data) => {
      this.lastToken = user.key
      _callback(null, data)
      this.unbindAuthListener(successCallback, errorCallback)
    }
    const errorCallback = () => {
      _callback(true)
      this.unbindAuthListener(successCallback, errorCallback)
    }

    if (!user || typeof user === 'undefined') {
      return _callback(true)
    }
    this.io.on('authentication-ok', successCallback)
      .on('authentication-ko', errorCallback)
      .emit('authentify', { token: user.key, device: 'software' })
  }

  unbindAuthListener (success, error) {
    this.io.removeListener('authentication-ok', success)
    this.io.removeListener('authentication-ko', error)
  }
}

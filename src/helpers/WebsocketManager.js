import ioClient from 'socket.io-client'

export default class WebsocketManager {
  constructor (displayLoader) {
    this.io = null
    this.displayLoader = displayLoader
    this.lastToken = null
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
    if (!user || typeof user === 'undefined') {
      return _callback(true)
    }
    this.io.on('authentication-ok', (data) => {
      this.lastToken = user.key
      _callback(null, data)
    }).on('authentication-ko', (data) => {
      _callback(true)
    }).emit('authentify', { token: user.key, device: 'software' })
  }
}

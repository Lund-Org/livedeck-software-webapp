import superagent from 'superagent'

export default {
  /**
   * Call the /valid-token route of the livedeck server
   * @param {string} token The jwt token stored by Electron
   * @param {Function} callback The callback to execute after the ajax call
   */
  authByToken (token, callback) {
    superagent.post(`http://${global.endpoint}/valid-token`)
      .send({ jwtToken: token })
      .set('Content-Type', 'application/json')
      .end(callback)
  },
  /**
   * Call the /login route of the livedeck server
   * @param {Object} payload The payload to log an user
   */
  async login (payload) {
    return superagent.post(`http://${global.endpoint}/login`)
      .send(payload)
      .set('Content-Type', 'application/json')
  },
  /**
   * Call the /login route of the livedeck server
   * @param {Object} payload The payload to log an user
   */
  async register (payload) {
    return superagent.post(`http://${global.endpoint}/register`)
      .send(payload)
      .set('Content-Type', 'application/json')
  }
}

import superagent from 'superagent'

export default {
  /**
   * Call the /categories route of the livedeck server
   * @param {string} key The key of the user
   */
  async index (key) {
    return superagent.get(`http://${global.endpoint}/bindings`)
      .set('Content-Type', 'application/json')
      .set('Authorization', key)
  }
}

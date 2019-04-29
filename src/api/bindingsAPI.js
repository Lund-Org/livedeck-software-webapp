import superagent from 'superagent'

export default {
  /**
   * Call the GET /bindings route of the livedeck server
   * @param {string} key The key of the user
   */
  async index (key) {
    return superagent.get(`http://${global.endpoint}/bindings`)
      .set('Content-Type', 'application/json')
      .set('Authorization', key)
  },
  /**
   * Call the PATCH /bindings/:id route of the livedeck server
   * @param {string} key The key of the user
   * @param {Object} binding The binding to update
   */
  async updateBinding (key, binding) {
    return superagent.patch(`http://${global.endpoint}/bindings/${binding.id}`)
      .send(binding)
      .set('Content-Type', 'application/json')
      .set('Authorization', key)
  }
}

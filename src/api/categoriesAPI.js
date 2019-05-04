import superagent from 'superagent'

export default {
  /**
   * Call the GET /categories route of the livedeck server
   * @param {string} key The key of the user
   */
  async index (key) {
    return superagent.get(`http://${global.endpoint}/categories`)
      .set('Content-Type', 'application/json')
      .set('Authorization', key)
  },
  /**
   * Call the POST /categories route of the livedeck server
   * @param {string} key The key of the user
   */
  async addBinding (key, categoryId, bindingId) {
    return superagent.post(`http://${global.endpoint}/categories/${categoryId}/bindings/${bindingId}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', key)
  },
  /**
   * Call the PATCH /categories/:id route of the livedeck server
   * @param {string} key The key of the user
   * @param {Object} category The category to update
   */
  async update (key, category) {
    return superagent.patch(`http://${global.endpoint}/categories/${category.id}`)
      .send(category)
      .set('Content-Type', 'application/json')
      .set('Authorization', key)
  },
  /**
   * Call the POST /category route of the livedeck server
   * @param {string} key The key of the user
   * @param {number} categoryId The id of the category to delete
   */
  async createCategory (key, category) {
    return superagent.post(`http://${global.endpoint}/categories`)
      .send(category)
      .set('Content-Type', 'application/json')
      .set('Authorization', key)
  },
  /**
   * Call the DELETE /category/:id route of the livedeck server
   * @param {string} key The key of the user
   * @param {number} categoryId The id of the category to delete
   */
  async deleteCategory (key, categoryId) {
    return superagent.delete(`http://${global.endpoint}/categories/${categoryId}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', key)
  }
}

export default {
  /**
   * Remove an item from a list and return it
   * @param {Array} list The list of item to process
   * @param {number} id The id of the element to remove
   * @return {Array}
   */
  removeItemFromArrayById (list, id) {
    const newList = list.slice(0)
    let index = -1

    newList.some((binding, bindingIndex) => {
      if (binding.id === id) {
        index = bindingIndex
      }
    })
    if (index !== -1) {
      newList.splice(index, 1)
    }
    return newList
  }
}

module.exports = {
  addUniqueId (array, id) {
    if (!array.includes(id)) {
      array.push(id)
    }
    return array
  }
}

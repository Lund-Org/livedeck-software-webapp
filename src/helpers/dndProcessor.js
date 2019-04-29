/**
 * Search an item with a specific identifier
 * @param {number} id The identifier of the item to find
 * @param {Array<Object>} list The list of items
 */
function getItemInList (id, list) {
  for (const itemIndex in list) {
    if (list[itemIndex].id === id) {
      return {
        index: itemIndex,
        item: list[itemIndex]
      }
    }
  }

  return null
}

/**
 * Sort the bindings after a drag and drop
 * @param {Object} event The event of the dnd
 * @param {Array<Binding>} bindings The list of the bindings
 */
function sortList (event, bindings) {
  const result = Array.from(bindings)
  const [removed] = result.splice(event.source.index, 1)
  result.splice(event.destination.index, 0, removed)
  result[event.destination.index].weight = event.destination.index

  return { orderedList: result, itemUpdated: result[event.destination.index] }
}

/**
 * Sort the bindings after a drag and drop
 * @param {Object} event The event of the dnd
 * @param {Array<Binding>} bindings The list of the bindings
 */
function _isBindingAlreadyInCategory (binding, category) {
  if (typeof category.bindings !== 'undefined') {
    return category.bindings.reduce((carry, categoryBinding) => {
      return carry || categoryBinding.id === binding.id
    }, false)
  }

  return false
}

/**
 * Set a binding to a category
 * @param {Object} event The event of the dnd
 * @param {Array<Binding>} bindings The list of the bindings
 * @param {Array<Category>} categories The list of the categories
 * @return {mixed} An object of the entities updated or null
 */
function assignBindingToCategory (event, bindings, categories) {
  const bindingMatch = event.draggableId.match(/binding-(\d+)/)
  const categoryMatch = event.destination.droppableId.match(/category-(\d+)-bindings/)

  if (bindingMatch && categoryMatch) {
    const binding = getItemInList(parseInt(bindingMatch[1]), bindings)
    const category = getItemInList(parseInt(categoryMatch[1]), categories)

    if (binding && category && !_isBindingAlreadyInCategory(binding.item, category.item)) {
      const categoriesCopy = categories.slice(0)

      if (typeof categoriesCopy[category.index].bindings === 'undefined') {
        categoriesCopy[category.index].bindings = []
      }
      categoriesCopy[category.index].bindings.push(binding.item)
      return {
        bindingId: binding.item.id,
        categoryId: category.item.id,
        categories: categoriesCopy
      }
    }
  }

  return null
}

export default {
  sortList,
  assignBindingToCategory
}

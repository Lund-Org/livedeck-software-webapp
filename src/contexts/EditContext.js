import React from 'react'

export default React.createContext({
  user: {
    data: {},
    updateUser: () => {}
  },
  categories: {
    data: [],
    updateCategories: () => { }
  },
  bindings: {
    data: [],
    updateBindings: () => { }
  }
})

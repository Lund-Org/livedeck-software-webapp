import React from 'react'
import Category from '../components/Category'
import EditWrapper from './abstract/EditWrapper'

class CategoriesWrapper extends EditWrapper {
  constructor (props) {
    super(props)
    this.generateBinding = this.generateBinding.bind(this)
  }

  generateBinding (categories, category) {
    return <Category key={categories.length} category={{ ...category, index: categories.length }} />
  }

  render () {
    return super.render('category', 'link', this.props.categories, this.generateBinding)
  }
}

export default CategoriesWrapper

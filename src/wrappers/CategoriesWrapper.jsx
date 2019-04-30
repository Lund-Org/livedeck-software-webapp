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
    return (
      <div className={`binding-wrapper column is-6`}>
        {this.renderDroppableArea(
          'category',
          this.renderResource(this.props.categories, this.generateBinding)
        )}
        {this.renderFooterActions('link', 'createCategory')}
      </div>
    )
  }
}

export default CategoriesWrapper

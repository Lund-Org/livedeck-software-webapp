import React from 'react'
import Binding from '../components/Binding'
import EditWrapper from './abstract/EditWrapper'

class BindingWrapper extends EditWrapper {
  constructor (props) {
    super(props)
    this.generateBinding = this.generateBinding.bind(this)
  }

  generateBinding (bindings, binding) {
    return <Binding key={bindings.length} binding={{ ...binding, index: bindings.length }} />
  }

  render () {
    return (
      <div className={`binding-wrapper column is-6`}>
        {this.renderDroppableArea(
          'binding',
          this.renderResource(this.props.bindings, this.generateBinding)
        )}
        {this.renderFooterActions('link', 'createBinding')}
      </div>
    )
  }
}

export default BindingWrapper

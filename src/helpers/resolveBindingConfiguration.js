import React from 'react'
import bindingTypeComponents from '../components/binding-types'

export default function (type, binding, onConfigurationUpdate) {
  for (const index in bindingTypeComponents) {
    if (bindingTypeComponents[index].type === type) {
      const ComponentClass = bindingTypeComponents[index]

      return <ComponentClass binding={binding} onConfigurationUpdate={onConfigurationUpdate} />
    }
  }
  return null
}

import React from 'react'
import * as popinsIdentifier from '../constants/popin'
import CreateBindingPopin from '../popins/CreateBindingPopin.jsx'
import CreateCategoryPopin from '../popins/CreateCategoryPopin.jsx'
import DeleteWarningPopin from '../popins/DeleteWarningPopin.jsx'

export default function (currentPopin, appState, componentProps) {
  switch (currentPopin) {
    case popinsIdentifier.CREATE_BINDING_POPIN_IDENTIFIER:
      return <CreateBindingPopin />
    case popinsIdentifier.CREATE_CATEGORY_POPIN_IDENTIFIER:
      return <CreateCategoryPopin />
    case popinsIdentifier.EDIT_BINDING_POPIN_IDENTIFIER:
      return <div></div>
    case popinsIdentifier.EDIT_CATEGORY_POPIN_IDENTIFIER:
      return <div></div>
    case popinsIdentifier.DELETE_CONFIRMATION_POPIN_IDENTIFIER:
      return <DeleteWarningPopin />
    default:
      return null
  }
}

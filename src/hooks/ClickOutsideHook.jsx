import React, { useEffect } from 'react'

function ClickOutsideHook ({ children, onClick }) {
  const refs = React.Children.map(children, () => React.createRef())

  const handleClick = e => {
    const isInside = refs.some(ref => {
      if (ref.current) {
        return ref.current.contains(e.target)
      } else {
        return true
      }
    })
    if (!isInside) {
      onClick()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return function () {
      document.removeEventListener('click', handleClick)
    }
  })

  return React.Children.map(children, (element, idx) =>
    React.cloneElement(element, { ref: refs[idx] })
  )
}

export default ClickOutsideHook

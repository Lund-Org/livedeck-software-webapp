import React, { Component } from 'react'
import { SemipolarSpinner } from 'react-epic-spinners'

class LoadingWrapper extends Component {
  render () {
    const background = (typeof this.props.background !== 'undefined') ? (
      <div className="loading-background" style={{ background: this.props.background }}></div>
    ) : null

    return (
      <div className="loading-wrapper">
        {background}
        <div className="loading-block">
          <SemipolarSpinner color={ this.props.color } />
        </div>
      </div>
    )
  }
}

export default LoadingWrapper

import React, { Component } from 'react'
import { SemipolarSpinner } from 'react-epic-spinners'

class LoadingWrapper extends Component {
  render () {
    return (
      <div className="loading-wrapper">
        <div className="loading-background" style={{ background: this.props.background }}></div>
        <div className="loading-block">
          <SemipolarSpinner color={ this.props.color } />
        </div>
      </div>
    )
  }
}

export default LoadingWrapper

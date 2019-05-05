import React, { Component } from 'react'
import {
  EDIT_PAGE_IDENTIFIER,
  STREAM_PAGE_IDENTIFIER
} from '../constants/page'
import Link from '../components/Link.jsx'
import DisconnectButton from '../components/DisconnectButton.jsx'

class HomePage extends Component {
  render () {
    return (
      <React.Fragment>
        <DisconnectButton user={this.props.user} />
        <div className='page home-page'>
          <Link className="button is-info" redirectPage={EDIT_PAGE_IDENTIFIER} label="Edition mode" />
          <Link className="button is-warning" redirectPage={STREAM_PAGE_IDENTIFIER} label="Streaming mode" />
        </div>
      </React.Fragment>
    )
  }
}

export default HomePage

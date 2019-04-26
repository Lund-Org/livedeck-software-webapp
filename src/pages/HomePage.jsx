import React, { Component } from 'react'
import {
  EDIT_PAGE_IDENTIFIER,
  STREAM_PAGE_IDENTIFIER
} from '../constants/page'
import Link from '../components/Link.jsx'

class HomePage extends Component {
  // Style to put on the link :
  //  display: flex;
  //  justify-content: center;
  //  align-items: center;
  //  height: 100%

  render () {
    return (
      <div class='home-page'>
        <Link redirectPage={EDIT_PAGE_IDENTIFIER} label="Edition mode" />
        <Link redirectPage={STREAM_PAGE_IDENTIFIER} label="Streaming mode" />
      </div>
    )
  }
}

export default HomePage

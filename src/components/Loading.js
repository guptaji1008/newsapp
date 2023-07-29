import React, { Component } from 'react'
import loading from './Settings.gif'

export class Loading extends Component {
  render() {
    return (
      <div className='text-center mb-3'>
        <img src={loading} alt="" />
      </div>
    )
  }
}

export default Loading

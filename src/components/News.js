import React, { Component } from 'react'
import NewsItems from './newsItems'

export class News extends Component {
  render() {
    return (
      <div>
        <h1 className='my-3'>Top News - Headlines</h1>
        <div className="container my-5">
            <div className="row">
                <div className="col-md-4">
                    <NewsItems title="My Title" description="My Description"/>
                </div>
                <div className="col-md-4">
                    <NewsItems title="My Title" description="My Description"/>
                </div>
                <div className="col-md-4">
                    <NewsItems title="My Title" description="My Description"/>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default News

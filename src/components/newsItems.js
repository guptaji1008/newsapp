import React, { Component } from 'react'

export class newsItems extends Component {

  render() {
      let {title, description, imageUrl, url, author, time} = this.props
    return (
      <div>
        <div className="card">
            <img src={imageUrl} className="card-img-top" alt="please wait"/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <a href={url} target='_blank' className="btn btn-primary">Detail</a>
                <div className="text-body-secondary mt-3">Author: {author?author:"unknown"}</div>
                <div className="text-body-secondary">Published at: {new Date(time).toGMTString()}</div>
            </div>
        </div>
      </div>
    )
  }
}

export default newsItems

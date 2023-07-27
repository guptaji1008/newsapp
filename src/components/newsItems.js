import React, { Component } from 'react'

export class newsItems extends Component {
  render() {
      let {title, description, imageUrl, url} = this.props
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
            <img src={imageUrl} className="card-img-top" alt="please wait"/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <a href={url} target='_blank' className="btn btn-primary">Detail</a>
            </div>
        </div>
      </div>
    )
  }
}

export default newsItems

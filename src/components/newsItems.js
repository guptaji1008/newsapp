import React from 'react'

export default function newsItems(props) {

    return (
      <div>
        <div className="card">
            <img src={props.imageUrl} className="card-img-top" alt="not found"/>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <a href={props.url} target='_blank' className="btn btn-primary">Detail</a>
                <div className="text-body-secondary mt-3">Author: {props.author?props.author:"unknown"}</div>
                <div className="text-body-secondary">Published at: {new Date(props.time).toGMTString()}</div>
            </div>
        </div>
      </div>
    )
}

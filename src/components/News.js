import React, { Component } from 'react'
import NewsItems from './newsItems'

export class News extends Component {
  render() {
    return (
      <div>
        This is a news panel where all the news headlines will be reflected.
        <NewsItems/>
        <NewsItems/>
        <NewsItems/>
        <NewsItems/>
        <NewsItems/>
        <NewsItems/>
        <NewsItems/>
      </div>
    )
  }
}

export default News

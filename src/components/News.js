import React, { Component } from 'react'
import NewsItems from './newsItems'
import Loading from './Loading';
import PropTypes from 'prop-types'



export class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
    
    constructor () {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    
    pageHandler = async() => {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=358fe4e9512b4e69a219385e80fce8b2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({articles: parseData.articles, totalResults: parseData.totalResults, loading: false})
    }

    async componentDidMount() {
      console.log(this.state.page)
      this.pageHandler()
    }
    
    async previousPage() {
     await this.setState({page: this.state.page - 1})
      console.log(this.state.page)
      this.pageHandler()
    }
    
    async nextPage() {
     await this.setState({page: this.state.page + 1})
      console.log(this.state.page)
      this.pageHandler()
    }

  render() {
    return (
      <div>
        <h1 className='text-center mt-5'>Top News - Headlines {`(${this.props.category})`}</h1>
        {this.state.loading && <Loading/>}
        <div className="container my-5">
            <div className="row">
                {!this.state.loading && this.state.articles?.map(element => {
                return <div key={element.url} className="col-md-4 my-3">
                    <NewsItems title={element.title} description={element.description} imageUrl={element.urlToImage} url={element.url} author={element.author} time={element.publishedAt}/>
                </div>
                })}
                </div>
            </div>
            <div className="container d-flex justify-content-between mb-5">
                <button disabled={this.state.page<=1} type="button" className="btn-sm btn btn-primary" onClick={this.previousPage.bind(this)}>&larr; previous</button>
                <button disabled={this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn-sm btn btn-primary" onClick={this.nextPage.bind(this)}>Next &rarr;</button>
            </div>
        </div>
    )
  }
}

export default News

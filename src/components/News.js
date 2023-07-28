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

    async componentDidMount() {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=af8d9d5e03cb4be792931ea169affcbe&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({articles: parseData.articles, totalResults: parseData.totalResults, loading: false})
      // console.log(this.state.totalResults)
    }

    async previousPage() {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=af8d9d5e03cb4be792931ea169affcbe&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({articles: parseData.articles, page: this.state.page - 1, loading: false})
      // console.log(this.state.totalResults)
    }
    
    async nextPage() {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=af8d9d5e03cb4be792931ea169affcbe&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({articles: parseData.articles, page: this.state.page + 1, loading: false})
      // console.log(this.state.totalResults, this.state.page)
    }

  render() {
    return (
      <div>
        <h1 className='text-center mt-5'>Top News - Headlines</h1>
        {this.state.loading && <Loading/>}
        <div className="container my-5">
            <div className="row">
                {!this.state.loading && this.state.articles.map(element => {
                return <div key={element.url} className="col-md-4 my-3">
                    <NewsItems title={element.title} description={element.description} imageUrl={element.urlToImage} url={element.url}/>
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

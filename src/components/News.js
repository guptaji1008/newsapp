import React, { Component } from 'react'
import NewsItems from './newsItems'
import Loading from './Loading';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



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

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
    
    constructor (props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsApp - ${this.capitalizeFirstLetter(this.props.category)}`
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

    fetchMoreData = async () => {
      await this.setState({page: this.state.page + 1})
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=358fe4e9512b4e69a219385e80fce8b2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({articles: this.state.articles.concat(parseData.articles), totalResults: parseData.totalResults})
    }

  render() {
    return (
      <div>
        <h1 className='text-center mt-5'>Top News - Headlines {`(${this.capitalizeFirstLetter(this.props.category)})`}</h1>
        {this.state.loading && <Loading/>}
        <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length < this.state.totalResults} loader={<Loading/>}>
        <div className="container my-5">
            <div className="row">
                {this.state.articles?.map(element => {
                return <div key={element.url} className="col-md-4 my-3">
                    <NewsItems title={element.title} description={element.description} imageUrl={element.urlToImage} url={element.url} author={element.author} time={element.publishedAt}/>
                </div>
                })}
                </div>
            </div>
          </InfiniteScroll>
        </div>
    )
  }
}

export default News

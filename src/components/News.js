import React, {useState, useEffect} from 'react'
import NewsItems from './newsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



export default function News(props) {

  

 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
    
        
    
    const pageHandler = async() => {
      props.setProgress(10)
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true)
      let data = await fetch(url);
      props.setProgress(50)
      let parseData = await data.json();
      props.setProgress(70)
      setArticles(parseData.articles)
      setTotalResults(parseData.totalResults)
      setLoading(false)
      props.setProgress(100)
    }

    useEffect(() => {
        document.title = `NewsApp - ${capitalizeFirstLetter(props.category)}`
        pageHandler()
        // eslint disable next line
    }, [])

    const fetchMoreData = async () => {
      setPage(page + 1)
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
      let data = await fetch(url);
      let parseData = await data.json();
      setArticles(articles.concat(parseData.articles))
      setTotalResults(parseData.totalResults)
    }

    return (
      <div>
        <h1 className='text-center' style={{marginTop: '8vw'}}>Top News - Headlines {`(${capitalizeFirstLetter(props.category)})`}</h1>
        {loading && <Spinner/>}
        <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length < totalResults} loader={<Spinner/>}>
        <div className="container my-5">
            <div className="row">
                {articles?.map(element => {
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


News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}



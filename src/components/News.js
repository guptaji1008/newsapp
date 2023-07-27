import React, { Component } from 'react'
import NewsItems from './newsItems'

export class News extends Component {
    articles = [
        {
          "source": {
            "id": "news24",
            "name": "News24"
          },
          "author": "Herman Mostert",
          "title": "SA's Heinrich Klaasen smashes first-ever century in Major League Cricket",
          "description": "South Africa's Heinrich Klaasen became the first player to score a century in Major League Cricket when he smashed 110 not out off 44 balls for the Seattle Orcas against MI New York.",
          "url": "https://www.news24.com/sport/cricket/sas-heinrich-klaasen-smashes-first-ever-century-in-major-league-cricket-20230726",
          "urlToImage": "https://cdn.24.co.za/files/Cms/General/d/8906/50217ab8fb034f3d96a0ae2e9371991b.jpg",
          "publishedAt": "2023-07-26T09:26:16+00:00",
          "content": "South Africa's Heinrich Klaasen became the first player to score a century in Major League Cricket (MLC) when he smashed 110 not out off 44 balls for the Seattle Orcas against MI New York in Morrisvi… [+610 chars]"
        },
        {
          "source": {
            "id": "espn-cric-info",
            "name": "ESPN Cric Info"
          },
          "author": null,
          "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
          "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
          "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
          "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
          "publishedAt": "2020-04-27T11:41:47Z",
          "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
        },
        {
          "source": {
            "id": "espn-cric-info",
            "name": "ESPN Cric Info"
          },
          "author": null,
          "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
          "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
          "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
          "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
          "publishedAt": "2020-03-30T15:26:05Z",
          "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
        }
      ]
    constructor () {
        super();
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1
        }
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
    }

    async componentDidMount() {
      let url = "https://newsapi.org/v2/top-headlines?country=in&category=sport&apiKey=af8d9d5e03cb4be792931ea169affcbe&page=1&pageSize=20";
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({articles: parseData.articles, totalResults: parseData.totalResults})
      // console.log(this.state.totalResults)
    }

    async previousPage() {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=sport&apiKey=af8d9d5e03cb4be792931ea169affcbe&page=${this.state.page - 1}&pageSize=20`;
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({articles: parseData.articles, page: this.state.page - 1})
      // console.log(this.state.totalResults)
    }
    
    async nextPage() {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=sport&apiKey=af8d9d5e03cb4be792931ea169affcbe&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({articles: parseData.articles, page: this.state.page + 1})
      // console.log(this.state.totalResults, this.state.page)
    }

  render() {
    return (
      <div>
        <h1 className='my-3'>Top News - Headlines</h1>
        <div className="container my-5">
            <div className="row">
                {this.state.articles.map(element => {
                return <div key={element.url} className="col-md-4 my-3">
                    <NewsItems title={element.title} description={element.description} imageUrl={element.urlToImage} url={element.url}/>
                </div>
                })}
                </div>
            </div>
            <div className="container d-flex justify-content-between mb-5">
                <button disabled={this.state.page<=1} type="button" className="btn-sm btn btn-primary" onClick={this.previousPage}>&larr; previous</button>
                <button disabled={this.state.page >= Math.ceil(this.state.totalResults/20)} type="button" className="btn-sm btn btn-primary" onClick={this.nextPage}>Next &rarr;</button>
            </div>
        </div>
    )
  }
}

export default News

import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  constructor() {
    super();
    console.log("hello i am a cunstroctor");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  // componentWillUnmount runs after render method finished to run
  // componentWillUnmount is a react life cycle

  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=213d94e8cedc454fb8e1e59d82e096bc&page=1&pageSize=${this.props.pageSize}`;

      this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  // Logic for previous button
  handlePreviousClick = async () => {
    console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=213d94e8cedc454fb8e1e59d82e096bc&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };

  // Logic for next button
  handleNextClick = async () => {
    // this if condition calculates the total results devided by 20 and state of the page
    // and if state of the page is less than the total number than it's not works otherwise
    // code under an else blocks runs
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      console.log("next");

      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=213d94e8cedc454fb8e1e59d82e096bc&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;

      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData = await data.json();
      // console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,

        // set to loading spinner to false when api loads all the data
        loading : false
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">News - Top Headlines</h1>

        {/* import spinner component */}
        {this.state.loading && <Spinner/>}

        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>

        <div className="container d-flex justify-content-between">

          {/* privios button */}
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-light"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>

          {/* Next button */}
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;

import React from "react";
import MovieItem from "./movieitem";
import LoadingImg from '../asset/images/loading-icon.png';
import '../css/movieslist.scss';
import '../css/loading.scss';

class Movieslist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isMoviesLoaded: false,
      movies: [],
      page: 1
    }
  }

  infiniteScroll = () => {
    // End of the document reached?
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) 
    {
      let newPage = this.state.page;
      newPage++;
      this.setState({
        page: newPage
      });
      
      this.fetchMovieData(newPage);
    }
  }
     
  fetchMovieData = (pageNum) => {
    let popularMovieUrl = this.props.apiURL+pageNum;
    fetch(popularMovieUrl)
      .then(res => res.json())
      .then(
        (data) => {
          this.setState({
            isMoviesLoaded: true,
            movies: [...this.state.movies,...data.results]
          });
        },
        (error) => {
          this.setState({
            isMoviesLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.infiniteScroll);
    this.fetchMovieData(this.state.page);
  }

  // shouldComponentUpdate = ({this.props.apiURL}) => {
  //   this.fetchMovieData(this.state.page);
  // }
  
  render() {
    const { error, isMoviesLoaded, movies } = this.state;
    // console.log(`data movie object: ${movies}`);
    // console.log(`data: ${JSON.stringify(movies)}`);
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isMoviesLoaded) {
      return (
        <div className="loading-block">
          <img src={LoadingImg} alt="Loading"/>
          LOADING
        </div>
      );
    } else {  
      return (
        <div className={`movie-section ${this.props.gridlistviewClass}`}>
          <div className="container">
            <div className="inner">
              {movies.map((movie,idx) => (
                <MovieItem 
                  key={idx} 
                  movie={movie} 
                />
                ))
              }
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Movieslist;
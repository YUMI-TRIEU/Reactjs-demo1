import React from "react";
import '../css/movieitem.scss';
class MovieItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isGenresLoaded: false,
      genresApiData: [],
    }
  }
  fetchGenresData = () => {
    let genreUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=5631fcf890fa9a820ad044c6c3736a62&language=en-US';
    fetch(genreUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isGenresLoaded: true,
            genresApiData: result
          });
        },
        (error) => {
          this.setState({
            isGenresLoaded: true,
            error
          });
        }
      )
  }
  componentDidMount = () => {
    this.fetchGenresData();
  }
  render() {
    // console.log(`data object: ${this.props.movies}`);
    // console.log(`data: ${JSON.stringify(this.props.movies)}`);
    const { error, isGenresLoaded, genresApiData } = this.state;
    // console.log(`data genres: ${genresApiData}`);
    // console.log(`data: ${JSON.stringify(genresApiData)}`);
    if (this.state.error) {
      return <div>Error: {error.message}</div>;
    } else if (!isGenresLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="item">
          <div className="inner-item">
            <div className="img-frame">
              <img src={`https://image.tmdb.org/t/p/original${this.props.movie.poster_path}`} alt={this.props.movie.title} />
              <div className="year">{this.props.movie.release_date.split("-").slice(0, 1)}</div>
            </div>
            <div className="desc-content">
              <div className="container">
                <div className="wrap">
                  <div className="inner-desc">
                    <div className="name">{this.props.movie.title}</div>
                    <div className="genre">
                      {
                        this.props.movie.genre_ids.map(genre_id => (
                          genresApiData.genres.map(genre => (
                            genre_id === genre.id ? ', ' + genre.name : ''
                          ))
                        ))
                      }
                    </div>
                  </div>                  
                  <div className="vote">{this.props.movie.vote_average}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
export default MovieItem;
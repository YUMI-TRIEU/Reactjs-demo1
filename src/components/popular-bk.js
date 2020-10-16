import React from "react";

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    }
  }
  componentDidMount() {
    Promise.all([
      fetch("https://api.themoviedb.org/3/movie/popular?api_key=5631fcf890fa9a820ad044c6c3736a62&language=en-US&page=1"),
      fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=5631fcf890fa9a820ad044c6c3736a62&language=en-US')
    ])
    .then(function (responses) {
      // .then(res => Promise.all(res.map((res) => res.json())))
        // Get a JSON object from each of the responses
        return Promise.all(responses.map(function (response) {
          return response.json();
        }))})
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }
    render() {
      const { error, isLoaded, data } = this.state;
      // let genreName = [];
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {  
        return (
          // <BrowserRouter>
          //   <Switch>
          //     <Route path="/:id" exact restrict component={detail} />
          //   </Switch>
          // </BrowserRouter>
          <div className="movie-section">
            <div className="container">
              <div className="inner">
                {
                  (data[0].results).map(movie => (
                    <a href= { `/${movie.id}`} key = {movie.id} className="item">
                      <div className="inner-item">
                        <div className="img-frame">
                          <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                        </div>
                        <div className="desc-content">
                          <div className="container">
                            <div className="wrap">
                              <h3 className="name">{movie.title}</h3>
                              <div className="genre">
                                {
                                  movie.genre_ids.map(genre_id => (
                                    data[1].genres.map(genre => (
                                      // genre_id == genre.id ? (genreName =(genre.name)) : ''
                                      // genre_id == genre.id ? (genreName.push(genre.name)) : ''
                                      genre_id == genre.id ? ', ' + genre.name : ''
                                    ))
                                  ))
                                }
                                {
                                  // console.log("genreName " + genreName)
                                }
                                {
                                  // genreName.join(",") 
                                }
                                {
                                  // movie.genre_ids.join(",") 
                                }
                              </div>
                              <div className="year">{movie.release_date.split("-").slice(0, 1)}</div>
                              <div className="vote">{movie.vote_average}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))                  
                }
              </div>
            </div>
          </div>
        );
      }
    }
  }

export default Popular;
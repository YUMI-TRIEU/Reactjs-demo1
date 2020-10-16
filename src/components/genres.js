import React from "react";
import '../css/genres.scss';

class Genres extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        value: 0,
        error: null,
        isLoaded: false,
        data: []
      };
    }
    componentDidMount() {
      fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=5631fcf890fa9a820ad044c6c3736a62&language=en-US")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              data: result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
    setValue = (index) => {
      this.setState({
        value: index,
      });
    };
    
    render() {
      const { error, isLoaded, data } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {    
        return ( 
          <div className="genres-block">
            <select
              className="genres-select"
              // onChange={(e) => {
              //   this.setValue(e.target.selectedIndex);
              // }}
            >
              <option value="all">Genre</option>
              {
                (data.genres).map((movie, index) => (
                  <option 
                    key={index} 
                    value= {movie.name}
                  >
                    {movie.name}
                  </option>
                ))
              }
            </select>
          </div>
        );
      }
    }
  }

export default Genres;

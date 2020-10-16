import React from "react";
import Slider from "react-slick";
import '../css/banner.scss';
// import bannerImg from '../asset/images/banner/banner.png';
// import bannerImgPath from 'https://image.tmdb.org/t/p/original/';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    }
  }
  componentDidMount() {
    fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=5631fcf890fa9a820ad044c6c3736a62")
      .then(res => res.json())
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
      var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      let size = 3;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {  
        return (
          <div className="banner-section">
            <div className="slick-slider-block"> 
              <Slider {...settings}>
              {
                (data.results.slice(0, size)).map(movie => (
                  <div key = {movie.id} className="item">
                    <div className="inner-item">
                      <div className="img-frame">
                        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                      </div>
                      <div className="desc-content">
                        <div className="container">
                          <div className="inner">
                            <h3 className="name">{movie.title}</h3>
                            <div className="desc">{movie.overview}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))                  
              }
              </Slider>
            </div>
          </div>
        );
      }
    }
  }

export default Banner;
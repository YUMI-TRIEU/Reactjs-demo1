import React from 'react';

import Banner from './components/banner.js';
import MoviesControl from './components/moviescontrol.js';
import Movieslist from './components/movieslist.js';

import './css/common.scss';

let popularMovieAPI = "https://api.themoviedb.org/3/movie/popular?api_key=5631fcf890fa9a820ad044c6c3736a62&language=en-US&page=";
let topratedMovieAPI = "https://api.themoviedb.org/3/movie/top_rated?api_key=5631fcf890fa9a820ad044c6c3736a62&language=en-US&page=";
let upcomingMovieAPI = "https://api.themoviedb.org/3/movie/upcoming?api_key=5631fcf890fa9a820ad044c6c3736a62&language=en-US&page=";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabindex: 0, // 0: popular 1: toprated 2: upcoming
    };
  }

  updateTabIndex = (index) => {
    this.setState({
      tabindex: index
    });
  };

  render() {
    const { tabindex } = this.state;
    var showPopular = false;
    var showToprated = false;
    var showUpcoming = false;
    
    if( tabindex === 0 ) {
      showPopular = true;
    }else if ( tabindex === 1 ) {
      showToprated = true;
    } else if ( tabindex === 2 ) {
      showUpcoming = true;
    }

    return (
      <div className="App">
          <Banner />
          <MoviesControl 
            tabindex={tabindex} 
            updateTabIndex={this.updateTabIndex}
          />
          { showPopular ? <Movieslist apiURL={popularMovieAPI} /> : null }
          { showToprated ? <Movieslist apiURL={topratedMovieAPI} /> : null }
          { showUpcoming ? <Movieslist apiURL={upcomingMovieAPI} /> : null }
          
        </div>
    );
  }
}

export default App;

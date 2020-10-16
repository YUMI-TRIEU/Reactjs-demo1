import React from 'react';

import Banner from './components/banner.js';
import MoviesControl from './components/moviescontrol.js';
import Movieslist from './components/movieslist.js';
import GridListViewControl from './components/gridlistviewcontrol.js';
import Genres from './components/genres.js';

import './App.scss';
import './css/common.scss';

let popularMovieAPI = "https://api.themoviedb.org/3/movie/popular?api_key=5631fcf890fa9a820ad044c6c3736a62&language=en-US&page=";
let topratedMovieAPI = "https://api.themoviedb.org/3/movie/top_rated?api_key=5631fcf890fa9a820ad044c6c3736a62&language=en-US&page=";
let upcomingMovieAPI = "https://api.themoviedb.org/3/movie/upcoming?api_key=5631fcf890fa9a820ad044c6c3736a62&language=en-US&page=";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabindex: 0, // 0: popular 1: toprated 2: upcoming
      gridlistindex: 0, // 0: grid view 1: list view
    };
  }

  updateTabIndex = (index) => {
    this.setState({
      tabindex: index
    });
  };

  updateGirdListView = (index) => {
    this.setState({
      gridlistindex: index
    });
  };

  render() {
    const { tabindex, gridlistindex } = this.state;
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

    var showGridView = true;
    
    if( gridlistindex === 0 ) {
      showGridView = true;
    }else if ( gridlistindex === 1 ) {
      showGridView = false;
    } 

    return (
      <div className="App">
          <Banner />
          <div className="control">
            <div className="container">
              <div className="control-inner">
                <div className="filter-block">
                  <MoviesControl 
                    tabindex={tabindex} 
                    updateTabIndex={this.updateTabIndex}
                  />
                  <Genres />
                </div>
                <GridListViewControl 
                  gridlistindex={gridlistindex} 
                  updateGirdListView={this.updateGirdListView}
                />
              </div>
            </div>
          </div>

          { showPopular && (<Movieslist 
                              apiURL={popularMovieAPI} 
                              gridlistviewClass={ showGridView ? "grid-view" : "list-view" } 
                            />) }
          { showToprated && (<Movieslist 
                              apiURL={topratedMovieAPI}
                              gridlistviewClass={ showGridView ? "grid-view" : "list-view" }
                              />) }
          { showUpcoming && (<Movieslist 
                              apiURL={upcomingMovieAPI} 
                              gridlistviewClass={ showGridView ? "grid-view" : "list-view" }
                              />) }
        </div>
    );
  }
}

export default App;

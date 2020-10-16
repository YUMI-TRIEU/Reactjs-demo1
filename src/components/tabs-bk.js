import React from "react";
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Movieslist from './movieslist.js';
import 'react-tabs/style/react-tabs.css';
import '../css/tabs.scss';
let popularMovieAPI = "https://api.themoviedb.org/3/movie/popular?api_key=5631fcf890fa9a820ad044c6c3736a62&language=en-US&page=";
let topratedMovieAPI = "https://api.themoviedb.org/3/movie/top_rated?api_key=5631fcf890fa9a820ad044c6c3736a62&language=en-US&page=";
let upcomingMovieAPI = "https://api.themoviedb.org/3/movie/upcoming?api_key=5631fcf890fa9a820ad044c6c3736a62&language=en-US&page=";
class CustomTabs extends React.Component {
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
        <Tabs
          selectedIndex={this.state.value}
          onSelect={(index) => console.log(index)}
        >
          <div className="tab-wrap">
            <TabList>
              <Tab data-genres-css onClick={() => this.setValue(0)}>Genres</Tab>
              {
                (data.genres).map((movie, index) => (
                  <Tab data-genres-css key={index+1} onClick={() => this.setValue(index+1)}>{movie.name}</Tab>
                ))
              }
              <Tab selected onClick={() => this.setValue(data.genres.length + 1)}>Popular</Tab>
              <Tab onClick={() => this.setValue(data.genres.length + 2)}>Toprated</Tab>
              <Tab onClick={() => this.setValue(data.genres.length + 3)}>Upcoming</Tab>
            </TabList>
            <div className="dropMenu">
              <select
                className="tabSelect"
                onChange={(e) => {
                  this.setValue(e.target.selectedIndex);
                }}
              >
                <option value="all">Genre</option>
                {
                  (data.genres).map((movie, index) => (
                    <option key={index} value=
                    {movie.name}>{movie.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className="Panel">
            <TabPanel>Genre</TabPanel>
            {
              (data.genres).map((movie, index) => (
                <TabPanel key={index}>{movie.name}</TabPanel>
              ))
            }
            
            <TabPanel>
              <Movieslist apiURL={popularMovieAPI} />
            </TabPanel>
            <TabPanel>
              <Movieslist apiURL={topratedMovieAPI} />
            </TabPanel>
            <TabPanel>
              <Movieslist apiURL={upcomingMovieAPI} />
            </TabPanel>
          </div>
        </Tabs>
      );
    }
  }
  }

export default CustomTabs;

import React from "react";
import '../css/moviescontrol.scss';

class MoviesControl extends React.Component {

  updateTabIndex = (index) => {
    // console.log(index);
    this.props.updateTabIndex(index);
  };
  
  render() {
    return (
      <div className="moviecontrol-block">
        <div className="container">
          <div className="inner">
            <button 
              className={this.props.tabindex === 0 ? 'active' : ''} 
              onClick={() => this.updateTabIndex(0)}
            >
              Popular
            </button>
            <button 
              className={this.props.tabindex === 1 ? 'active' : ''} 
              onClick={() => this.updateTabIndex(1)}
            >
              Toprated
            </button>
            <button  
              className={this.props.tabindex === 2 ? 'active' : ''} 
              onClick={() => this.updateTabIndex(2)}
            >
              Upcoming
            </button >
          </div>
        </div>
      </div>
    );
  }
}

export default MoviesControl;

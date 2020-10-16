import React from "react";

import GridViewIcon from '../asset/images/collection-icon.png';
import ListViewIcon from '../asset/images/list-icon.png';

import '../css/gridlistviewcontrol.scss';

class GridListViewControl extends React.Component {

  updateGirdListView = (index) => {
    // console.log(index);
    this.props.updateGirdListView(index);
  };
  
  render() {
    return (
      <div className="grid-list-block">
        <ul className="inner">
          <li>
            <button 
              className={this.props.gridlistindex === 0 ? 'active' : ''} 
              onClick={() => this.updateGirdListView(0)}
              >
              <img src={GridViewIcon} alt="Gridview"/>
            </button>
          </li>
          <li>
            <button 
              className={this.props.gridlistindex === 1 ? 'active' : ''} 
              onClick={() => this.updateGirdListView(1)}
            >
              <img src={ListViewIcon} alt="Listview"/>
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

export default GridListViewControl;

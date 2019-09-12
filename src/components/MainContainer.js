import React, { Component } from 'react';
import ShoeContainer from './ShoeContainer'
import { Search } from 'semantic-ui-react'


class MainContainer extends Component {

  render() {
    return (
      <div>
        <Search/>
        <br></br>
        <ShoeContainer shoes={this.props.shoes} addToFavorites={this.props.addToFavorites} removeFromFavorites={this.props.removeFromFavorites}/>
      </div>
    );
  }

}

export default MainContainer;

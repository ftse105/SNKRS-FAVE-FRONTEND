import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
import ShoeCard from './ShoeCard'


class ShoeContainer extends Component {

  render() {
    return (
      <Card.Group itemsPerRow={3}>
      {
        this.props.shoes.map(shoe => {
          return  <ShoeCard key={shoe.id} addToFavorites={this.props.addToFavorites} removeFromFavorites={this.props.removeFromFavorites} shoe={shoe}/>
        })
      }
  </Card.Group>
    );
  }

}

export default ShoeContainer;

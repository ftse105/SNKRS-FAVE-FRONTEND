import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
import ShoeCard from './ShoeCard'


class FavoritesContainer extends Component {

  render() {
    // debugger
    // console.log(this.props.shoes);
    return (

        <Card.Group itemsPerRow={3}>
        {
          this.props.favorites.map(fave => {
            // Find the shoe related to the favorite
            const theShoe = this.props.shoes.find(shoe => shoe.id === fave.shoe_id)
            return  <ShoeCard removeFromFavorites={this.props.removeFromFavorites} shoe={theShoe} fave_id={fave.id}/>
          })
        }
      </Card.Group>
    );
  }

}

export default FavoritesContainer;

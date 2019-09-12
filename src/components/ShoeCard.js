import React, { Component } from 'react';
import { Card, Image, Button } from 'semantic-ui-react'


class ShoeCard extends Component {

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.shoe.name}</Card.Header>
          <Image src={this.props.shoe.image_url} size='small'/>
          <Card.Description>
            <h1>{this.props.shoe.description}</h1>
            <p>Price: ${this.props.shoe.price}</p>
          </Card.Description>
          {
            this.props.addToFavorites ?
            <Button color="blue" onClick={() => {
              this.props.addToFavorites(this.props.shoe)}}>ADD TO FAVORITES</Button>
            :
            <Button color="red" onClick={() => {
              this.props.removeFromFavorites(this.props.fave_id)}}>REMOVE FROM FAVORITES</Button>
          }
        </Card.Content>
      </Card>
    );
  }

}

export default ShoeCard;

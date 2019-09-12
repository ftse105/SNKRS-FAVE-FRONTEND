import React from 'react'
import { Modal, Loader, Grid, Form, Button } from 'semantic-ui-react'
import FavoritesContainer from "./FavoritesContainer"

class User extends React.Component {
	state = {
		user: null,
    bio: ""
	}

	componentDidMount(){
		const userId = this.props.match.params.id
		fetch(`http://localhost:3001/api/v1/users/${userId}`)
		.then(res => res.json())
		.then(data => {
      console.log(data);
			this.setState({user: data})
		})
	}

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  editBio = () => {
    // console.log(this.state.user.id);
    const userId = this.state.user.id
    fetch(`http://localhost:3001/api/v1/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({ user: {
        bio: this.state.bio
      }})
    })
    .then(res => res.json())
    .then(response => {
      this.setState({
        user: response
      })

    })
  }

	render(){
		if(this.state.user){
			return (

        <Grid columns={1} centered>
          <strong>MY PROFILE</strong>
          <Grid.Column>
            <br/>
              <strong>{this.state.user.username}</strong>
              <br/>
              <p>{this.state.user.bio}</p>
              <Modal trigger={<Button color="purple" >EDIT</Button>} closeIcon>

                <Modal.Content>
                  <Form onSubmit={this.editBio}>
                    <Form.Field>
                      <label>Bio</label>
                      <input value={this.state.bio} name="bio" onChange={this.handleChange} placeholder='Bio' />
                    </Form.Field>
                    <Button type="submit">GO</Button>
                  </Form>
                </Modal.Content>
              </Modal>
          </Grid.Column>

					<Grid.Column>
            <strong>My Favorties</strong>
            <br></br>
							<FavoritesContainer removeFromFavorites={this.props.removeFromFavorites} favorites={this.props.favorites} shoes={this.props.shoes}/>
					</Grid.Column>
				</Grid>

			)
		} else {
			return <Loader />
		}
	}
}

export default User

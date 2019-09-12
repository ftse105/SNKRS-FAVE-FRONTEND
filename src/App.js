import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import MainContainer from './components/MainContainer'
import User from './components/User'

class App extends Component {
	//initial state of currentUser is null because no one is logged in at the time
	//shoes array set to empty
	//favrotie is empty, will eventually push new shoes to this array
	state = {
		currentUser: null,
    shoes: [],
    favorites: []
	}

	componentDidMount(){
		const token = localStorage.getItem("token")
		if(token){
			// let's go get some user data
			fetch("http://localhost:3001/api/v1/auto_login", {
				headers: {
					"Authorization": token
				}
			})
			.then(res => res.json())
			.then(response => {
				if (response.errors){
					localStorage.removeItem("user_id")
					alert(response.errors)
				} else {
					this.setState({
						currentUser: response.user,
            favorites: response.user.favorites,
            shoes: response.shoes
					})
				}
			})
      fetch("http://localhost:3001/shoes")
      .then(res => res.json())
      .then(data => {
        this.setState({
          shoes: data
        })
      })
		}
	}
	//auto login for if the user is already logged in, when the page refreshes, doesnt log them out
	//once the component mounts, the response from the auto login sets to their page and favorites
	//also sets a second fetch when the page loads to get all the shoes

  addToFavorites = (obj) => {
    if (!this.state.favorites.includes(obj)) {

    fetch("http://localhost:3001/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
        "Authorization": localStorage.token
      },
      body: JSON.stringify({shoe_id: obj.id})
    })
    .then(res => res.json())
    .then(newFave => {
      this.setState({
        favorites: [...this.state.favorites, newFave]
        })
    })
    }
  }
	//makes a POST request to the backend, to POST a new favorite for the user
	//sets state to add the response to the copy of favorites array which is initially empty

  removeFromFavorites = id => {
    fetch(`http://localhost:3001/favorites/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(() => {
      this.setState({
        favorites: this.state.favorites.filter(fave => fave.id !== id)
      })
    })
  }

	//makes a DELETE request to the backend, to REMOVE from users favorite page
	//sets state to filter the array if the current favorites id is not equal to favorites id in the backend

	setCurrentUser = (user) => {
		this.setState({
			currentUser: user,
      favorites: user.favorites
		})
	}
	//sets current use to user thats logged in and favorties to the user's favorites

	logOut = () => {
		this.setState({
			currentUser: null
		})

		this.props.history.push("/login")
	}
	//sets the current user back to null when logged out so no one is logged in
	//this.props.history is from react route dom and when you log out, it automatically loads to "/login"

	render() {
		//creating routes for per user, all shoes, login and signup
		//passing everything above as a prop to their respective component 
		return (
			<Grid>
				<Navbar currentUser={this.state.currentUser} logOut={this.logOut} />
				<Grid.Row centered>
					<Switch>
            <Route path="/users/:id" render={(routerProps) => {
							return <User removeFromFavorites={this.removeFromFavorites} favorites={this.state.favorites} shoes={this.state.shoes} {...routerProps}/>
						}} />
          <Route path="/shoes" render={(routerProps) => {
							return <MainContainer shoes={this.state.shoes} addToFavorites={this.addToFavorites} removeFromFavorites={this.removeFromFavorites} {...routerProps}/>
						}} />
						<Route path="/login" render={(routerProps) => {
							return <Login setCurrentUser={this.setCurrentUser} {...routerProps}/>
						}} />
						<Route path="/signup" render={(routerProps) => {
							return <Signup setCurrentUser={this.setCurrentUser} {...routerProps}/>
						}} />
					</Switch>
				</Grid.Row>
			</Grid>
		);
	}
}

export default App;

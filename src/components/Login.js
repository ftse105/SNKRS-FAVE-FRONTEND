import React from 'react'
import { Form, Button } from 'semantic-ui-react'

class Login extends React.Component {
	state = {
		username: "",
		password: "",
	}
	//sets inital state to an empty string because nothing is typed at at the time

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	// change value on form depending on the name on the input

	handleSubmit = () => {
		// console.log("LOGGING IN", this.state)
		fetch("http://localhost:3001/api/v1/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json",
			},
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then(response => {
			console.log(response);
			if (response.errors) {
				alert(response.errors)
			} else {
				// response is the user object
				console.log(response)
				localStorage.setItem("token", response.token)
				this.props.setCurrentUser(response.user)
				this.props.history.push(`/users/${response.user.id}`)
			}
		})
	}
	//make a POST request to the backend for logging in
	//send the backend the entire state in which we enter, username and password
	//if the username and password exists then you log in, if not then an aler with come up
	//once logged in, sets current user to the response we got back which is the the state
	//after you login automatically go to the users profile page

	render(){
		return (
			<Form onSubmit={this.handleSubmit}>
		    <Form.Field>
		      <label>Username</label>
		      <input onChange={this.handleChange} name="username" value={this.state.username} placeholder='Username' />
		    </Form.Field>
		    <Form.Field>
		      <label>Password</label>
		      <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder='Password' />
		    </Form.Field>
		    <Button type='submit'>Submit</Button>
		  </Form>
		)
	}
}

export default Login

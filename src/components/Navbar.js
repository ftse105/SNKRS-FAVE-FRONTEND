import React from 'react'
import { Grid, Menu, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class Navbar extends React.Component {
	render(){
		return (
			<Grid.Row>
				<Grid.Column width={16}>
					<Menu>
						<Link className="item" to="/shoes">
							<Image src="https://is5-ssl.mzstatic.com/image/thumb/Purple128/v4/e7/54/40/e7544077-7ad0-232f-4330-b48ccbe54a41/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-6.png/246x0w.jpg" size="small"/>
						</Link>
						{
							this.props.currentUser

							?

							<Menu.Menu position="right">
								<Link className="item" to={`/users/${this.props.currentUser.id}`}>
                  {this.props.currentUser.username}
								</Link>
								<Menu.Item onClick={this.props.logOut}>
									Log out
								</Menu.Item>
							</Menu.Menu>

							:

							<Menu.Menu position="right">
								<Link className="item" to="/login">
									Login
								</Link>
								<Link className="item" to="/signup">
									Sign Up
								</Link>
							</Menu.Menu>

						}
					</Menu>
				</Grid.Column>
			</Grid.Row>
		)
	}
}

export default Navbar

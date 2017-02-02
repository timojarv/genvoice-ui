import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class LogoutButton extends Component {
	render() {
		if(this.props.authenticated) {
			return (
				<button onClick={this.props.logoutUser} className={"btn " + this.props.className}>
					Kirjaudu ulos
				</button>
			);
		} else return null;
	}
}

const mapStateToProps = state => ({ authenticated: state.auth.authenticated });

export default connect(mapStateToProps, actions)(LogoutButton);
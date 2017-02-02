import React, { Component } from 'react';
import { connect } from 'react-redux';

class Notifications extends Component {
	render() {
		const notification = this.props.notification;
		if(notification) return (
			<div className="alert alert-error notification">{notification.message}</div>
		);
		return null;
	}
}

const mapStateToProps = state => ({ notification: state.notification });

export default connect(mapStateToProps)(Notifications);
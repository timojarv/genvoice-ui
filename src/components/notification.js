import React, { Component } from 'react';
import { connect } from 'react-redux';

class Notifications extends Component {
	render() {
		const notification = this.props.notification;
		if(notification) return (
			<div className={`notification alert alert-${notification.type}`}>
				{notification.message}
			</div>
		);
		return null;
	}
}

const mapStateToProps = state => ({ notification: state.notification });

export default connect(mapStateToProps)(Notifications);
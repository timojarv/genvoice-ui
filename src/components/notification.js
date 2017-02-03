import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Notifications extends Component {
	renderNotification() {
		const notification = this.props.notification;
		if(notification) return (
			<div key={1} className={`notification alert alert-${notification.type}`}>
				{notification.message}
			</div>
		);
		return null;
	}


	render() {
		return (
			<ReactCSSTransitionGroup
				transitionName="fade"
				transitionEnterTimeout={100}
				transitionLeaveTimeout={300}>
				{this.renderNotification()}
			</ReactCSSTransitionGroup>
		);
	}
}

const mapStateToProps = state => ({ notification: state.notification });

export default connect(mapStateToProps)(Notifications);
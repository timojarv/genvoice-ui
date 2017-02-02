import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
	class Authentication extends Component {

		static contextTypes = {
			router: React.PropTypes.object
		}

		componentWillMount() {
			if(!this.props.authenticated) this.context.router.push("/login");
		}

		componentWillUpdate(nextProps) {
			if(!nextProps.authenticated) this.context.router.push("/login");
		}

		render() {
			return <ComposedComponent {...this.props} />
		}
	}

	function mapStateToProps(state) {
		return { authenticated: state.auth.authenticated };
	}

	return connect(mapStateToProps)(Authentication);
}




// In some other location
// We want to use this HOC

//import Authentication // This is the HOC
//import Resources // The component I want to wrap

//const ComposedComponent = Authentication(Resources)

// In some render method
//<ComposedComponent />
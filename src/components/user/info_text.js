import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserInfoText extends Component {
    render() {
        if(this.props.user.name) return (
            <p className="user-info">Kirjautuneena {this.props.user.name}.</p>
        );
        return null;
    }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(UserInfoText);
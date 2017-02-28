import React, { Component } from 'react';
import { connect } from 'react-redux';

class Loader extends Component {
    render() {
        return (
            <div className={"loader-overlay" + (this.props.active ? " visible" : "")}>
                <div className="loader active" />
                <div className="loader-message">{this.props.message}</div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ active: state.loader.active, message: state.loader.message });

export default connect(mapStateToProps)(Loader);
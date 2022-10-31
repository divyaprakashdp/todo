import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class WelcomeComponent extends Component {
    render() {
        return (
            <div>
                Welcome to home page Mr. {this.props.params.name}! Manage your todos <Link to="/todos">here</Link>.
            </div>
        )
    }
}

export default WelcomeComponent;
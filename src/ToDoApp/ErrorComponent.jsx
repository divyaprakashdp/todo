import React, { Component } from 'react';

class ErrorComponent extends Component {
    render() {
        return (
            <div className='container alert alert-danger'>
                Oops! An error occured.
            </div>
        )
    }
}

export default ErrorComponent
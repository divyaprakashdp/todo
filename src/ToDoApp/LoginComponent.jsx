import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService.js';

class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            hasLoginFailed: false,
            showSuccessMsg: false,
            serviceMessage: ""
        }

        // this.handleUsernameChange = this.handleUsernameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.logInClicked = this.logInClicked.bind(this)
        // this.executeHelloWorldService = this.executeHelloWorldService.bind(this)
        this.handleSuccessMsg = this.handleSuccessMsg.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    handleChange(event) {
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // handleUsernameChange(event){
    //     console.log(event.target.value)
    //     this.setState({
    //         username: event.target.value
    //     })
    // }

    // handlePasswordChange(event){
    //     console.log(event.target.value)
    //     this.setState({
    //         password: event.target.value
    //     })
    // }

    logInClicked(event) {
        if (this.state.username === "dp" && this.state.password === "1234") {
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
            this.props.navigate(`/welcome/${this.state.username}`);
            // this.setState({
            //     showSuccessMsg: true
            // })
            // this.setState({
            //     hasLoginFailed: false
            // })
        } else {
            this.setState({
                showSuccessMsg: false
            })
            this.setState({
                hasLoginFailed: true
            })
        }
    }

    // executeHelloWorldService() {
    //     HelloWorldService.executor()
    //         .then(response => this.handleSuccessMsg(response))
    //         .catch(error => this.handleError(error))
    // }

    handleSuccessMsg(response) {
        this.setState({ serviceMessage: response.data })
    }

    handleError(error) {
        this.setState({ serviceMessage: error.response.data.message })
        // console.log(error.response.data.message)
    }


    render() {
        return (
            <div className='container'>

                {this.state.hasLoginFailed && <div className='alert alert-warning'>Invalid Credentials</div>}
                {this.state.showSuccessMsg && <div>Login Successful</div>}
                {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>
                <ShowSuccessMsg showSuccessMsg={this.state.showSuccessMsg}/> */}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                <button onClick={this.logInClicked} className='btn btn-success'>Login</button>
            </div>

        )
    }
}

export default LoginComponent;
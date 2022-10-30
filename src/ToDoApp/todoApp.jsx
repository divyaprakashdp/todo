import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import HelloWorldService from '../api/todo/HelloWorldService.js'
import withNavigation from './withNavigation.jsx';
import withParams from './withParams.jsx';
import AuthenticationService from './AuthenticationService.js';
import AuthenticatedRoute from './AuthenticatedRoute.jsx';


export default class ToDoApp extends Component {


    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        // const Au
        return (
            <div className='container'>

                <Router>
                    <HeaderComponentWithNavigation />
                    <Routes>

                        <Route path="/" element={<LoginComponentWithNavigation />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />

                        <Route path="/welcome/:name" element={<AuthenticatedRoute><WelcomeComponentWithParams /></AuthenticatedRoute>} />
                        <Route path="/todos" element={<AuthenticatedRoute><ListTodosComponent /></AuthenticatedRoute>} />
                        <Route path="/logout" element={<LogoutComponent />} />
                        <Route path="*" element={<ErrorComponent />} />

                    </Routes>
                    <FooterComponent />
                </Router>
                {/* <LoginComponent/> */}
                {/* <WelcomeComponent/> */}
            </div>
        )
    }
}

class LogoutComponent extends Component {
    render() {
        return (
            <>
                <h1>You are logged out</h1>
                <div className='container'>Thank you for using the application.</div>
            </>
        )
    }

    logoutClicked(){

    }
}

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <header className='container'>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark p-2 m-2  bg-info text-white shadow rounded-4'>
                    <div><a className='navbar-brand' href="https://www.linkedin.com/in/divyaprakashdp/" target="_blank">dp</a></div>
                    <ul className='navbar-nav'>
                        {isUserLoggedIn && <li>
                            <Link to="/welcome/dp" className='nav-link'> Home</Link>
                        </li>}
                        {isUserLoggedIn && <li>
                            <Link to="/todos" className='nav-link'>Todos</Link>
                        </li>}
                    </ul>

                    <ul className='navbar-nav navbar-collapse justify-content-end'>
                        {!isUserLoggedIn && <li>
                            <Link to="/login" className='nav-link'>Login</Link>
                        </li>}
                        {isUserLoggedIn && <li>
                            <Link to="/logout" onClick={AuthenticationService.logout} className='nav-link'>Logout</Link>
                        </li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component {
    render() {
        return (
            <>
            <footer className='footer'>
                <span className='text-muted'>All rights reserved. @dp</span> 
            </footer>
            </>
        )
    }
}

class ListTodosComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos:
                [
                    { id: 1, desc: "Learn React", done: false, ETA: new Date() },
                    { id: 2, desc: "Learn Guitar", done: false, ETA: new Date() }
                ]
        }
    }

    render() {
        return (
            <div className='container'>
                <h1>Todo List</h1>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Done</th>
                            <th>ETA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(
                                todo =>
                                    <tr>
                                        <td>{todo.id}</td>
                                        <td>{todo.desc}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.ETA.toString()}</td>
                                    </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        )
    }
}

class ErrorComponent extends Component {
    render() {
        return (
            <div className='container alert alert-danger'>
                Oops! An error occured.
            </div>
        )
    }
}

class WelcomeComponent extends Component {
    render() {
        return (
            <div>
                Welcome to home page Mr. {this.props.params.name}! Manage your todos <Link to="/todos">here</Link>.
            </div>
        )
    }
}

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
                <button onClick={this.logInClicked}>Login</button>

                {/* <>
                    <button onClick={this.executeHelloWorldService}>Service</button>
                    <>
                        {this.state.serviceMessage}
                    </>
                </> */}

            </div>

        )
    }
}

// function ShowInvalidCredentials(props){
//     if(props.hasLoginFailed){
//         return <div>Invalid Credentials</div>
//     }
//     return null
// }

// function ShowSuccessMsg(props){
//     if(props.showSuccessMsg){
//         return <div>Login Successful</div>
//     }
//     return null
// }
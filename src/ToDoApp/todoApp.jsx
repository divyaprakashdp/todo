import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HelloWorldService from '../api/todo/HelloWorldService.js'
import withNavigation from './withNavigation.jsx';
import withParams from './withParams.jsx';


export default class ToDoApp extends Component {


    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        return (
            <div>

                <Router>
                <HeaderComponent/>
                    <Routes>
                        
                        <Route path="/" element={<LoginComponentWithNavigation />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />
                        <Route path="/welcome/:name" element={<WelcomeComponentWithParams />} />
                        <Route path="/todos" element={<ListTodosComponent />} />
                        <Route path="*" element={<ErrorComponent />} />
                        
                    </Routes>
                    <FooterComponent/>
                </Router>
                {/* <LoginComponent/> */}
                {/* <WelcomeComponent/> */}
            </div>
        )
    }
}

class HeaderComponent extends Component{
    render(){
        return(
            <header>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <div><a className='navbar-brand' href="https://www.linkedin.com/in/divyaprakashdp/" target="_blank">dp</a></div>
                    <ul className='navbar-nav'>
                        <li className='nav-link'>
                            <Link to="/welcome/dp"> Home</Link>
                        </li>
                        <li className='nav-link'>
                            <Link to="/todos">Todos</Link>
                        </li>
                    </ul>

                    <ul className='navbar-nav navbar-collapse justify-content-end'>
                        <li className='nav-link'>
                            <Link to="/login">Login</Link></li>
                        <li className='nav-link'>Logout</li>
                    </ul>
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component{
    render(){
        return(
            <div>
                <hr/>Footer
            </div>
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
            <div>
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
            <div>
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
        this.executeHelloWorldService = this.executeHelloWorldService.bind(this)
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
            this.props.navigate(`/welcome/${this.state.username}`)
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

    executeHelloWorldService() {
        HelloWorldService.executor()
            .then(response => this.handleSuccessMsg(response))
            .catch(error => this.handleError(error))
    }

    handleSuccessMsg(response) {
        this.setState({ serviceMessage: response.data })
    }

    handleError(error) {
        this.setState({ serviceMessage: error.response.data.message })
        // console.log(error.response.data.message)
    }


    render() {
        return (
            <div>

                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                {this.state.showSuccessMsg && <div>Login Successful</div>}
                {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>
                <ShowSuccessMsg showSuccessMsg={this.state.showSuccessMsg}/> */}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                <button onClick={this.logInClicked}>Login</button>

                <>
                    <button onClick={this.executeHelloWorldService}>Service</button>
                    <>
                        {this.state.serviceMessage}
                    </>
                </>

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
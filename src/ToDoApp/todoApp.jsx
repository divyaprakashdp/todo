import React, {Component} from 'react'
import HelloWorldService from '../api/todo/HelloWorldService.js'

export default class ToDoApp extends Component{
    

    render(){
        return(
            <div>
                <LoginComponent/>
            </div>
        )
    }
}

class LoginComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            username: "username",
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

    handleChange(event){
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

    logInClicked(event){
        if(this.state.username==="dp1506" && this.state.password==="Pass1"){
            this.setState({
                showSuccessMsg:true
            })
            this.setState({
               hasLoginFailed:false
            })
        }else{
            this.setState({
                showSuccessMsg:false
            })
            this.setState({
                hasLoginFailed:true
            })
        }
    }

    executeHelloWorldService(){
        HelloWorldService.executor()
        .then(response => this.handleSuccessMsg(response))  
        .catch(error => this.handleError(error))
    }

    handleSuccessMsg(response){
        this.setState({serviceMessage: response.data})
    }

    handleError(error){
        this.setState({serviceMessage: error.response.data.message})
        // console.log(error.response.data.message)
    }


    render(){
        return(
            <div>
                <>
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                {this.state.showSuccessMsg && <div>Login Successful</div>}
                {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>
                <ShowSuccessMsg showSuccessMsg={this.state.showSuccessMsg}/> */}
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                <button onClick={this.logInClicked}>Login</button>
                </>
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
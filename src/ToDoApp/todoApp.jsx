import React, {Component} from 'react'

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
            username: "user1",
            password: "pass1"
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this)

    }

    handleUsernameChange(event){
        console.log(event.target.value)
        this.setState({
            username: event.target.value
        })
    }


    render(){
        return(
            <div>
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleUsernameChange}></input>
                password: <input type="password" name="password"></input>
                <button>Login</button>
            </div>
        )
    }
}
import React, { Component } from 'react';
import TodoDataService from '../api/todo/TodoDataSeervice';
import AuthenticationService from './AuthenticationService.js'

class ListTodosComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos:
                [
                    // { id: 1, desc: "Learn React", done: false, ETA: new Date() },
                    // { id: 2, desc: "Learn Guitar", done: false, ETA: new Date() }
                ]
        }
    }

    componentDidMount(){
        let userName = AuthenticationService.getUser();
        TodoDataService.getAllTodos(userName)
        .then(
            response => {
                console.log(response.data)
                this.setState({todos: response.data})
            }
            
        )
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
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                    </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        )
    }
}

export default ListTodosComponent;
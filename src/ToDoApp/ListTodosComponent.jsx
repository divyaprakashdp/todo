import React, { Component } from 'react';
import TodoDataService from '../api/todo/TodoDataSeervice';
import AuthenticationService from './AuthenticationService.js'

class ListTodosComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos:
                [
                ],
                message: null
        }

        this.updateTodoClicked = this.updateTodoClicked.bind(this);
    }

    componentDidMount(){
        this.refreshTodos();
        
    }

    refreshTodos(){
        let userName = AuthenticationService.getUser();
        TodoDataService.getAllTodos(userName)
        .then(
            response => {
                console.log(response.data)
                this.setState({todos: response.data})
            }
            
        )
    }

    deleteTodoClicked(id){
        let username = AuthenticationService.getUser();
        TodoDataService.deleteTodo(username, id)
        .then(
            response =>{
                this.setState({message: `Successfully deleted todo no: ${id}`})
                this.refreshTodos()
            }
        )
        
    }

    updateTodoClicked(id){
        console.log('Updated');
        this.props.navigate(`/todos/${id}`);
        // this.props.navigate(`/welcome/${this.state.username}`);
        // let username = AuthenticationService.getUser();
        // TodoDataService.updateTodo(username, id)
        // .then(
        //     response =>{
        //         this.setState({message: `Successfully updated todo no: ${id}`})
        //         this.refreshTodos()
        //     }
        // )
        
    }

    render() {
        return (
            <div className='container'>
                <h1>Todo List</h1>
                {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Done</th>
                            <th>ETA</th>
                            <th>Actions</th>
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
                                        <td>
                                            <button className='btn btn-warning mx-2' onClick={this.updateTodoClicked}>Update</button>
                                            <button className='btn btn-danger' onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button>
                                        </td>
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
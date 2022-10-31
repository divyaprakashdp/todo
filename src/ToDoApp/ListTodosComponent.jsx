import React, { Component } from 'react';

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

export default ListTodosComponent;
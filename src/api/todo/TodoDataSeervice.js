import { Component } from 'react';
import axios from 'axios'

class TodoDataService extends Component{
    getAllTodos(name){
        // console.log("Executed service call");
        return axios.get(`http://localhost:8082/users/${name}/todos`)
    }

    deleteTodo(name, id){
        // console.log("Executed service call");
        return axios.delete(`http://localhost:8082/users/${name}/todos/${id}`)
    }

    // updateTodo(name, id){
    //     // console.log("Executed service call");
    //     return axios.put(`http://localhost:8082/users/${name}/todos/${id}`)
    // }
}

export default new TodoDataService()
import { Component } from 'react';
import axios from 'axios'

class TodoDataService extends Component{
    getAllTodos(name){
        // console.log("Executed service call");
        return axios.get(`http://localhost:8082/users/${name}/todos`)
    }
}

export default new TodoDataService
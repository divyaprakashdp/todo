import React, {Component} from 'react';
import './App.css';
import Counter from './Counter/counter';
import ToDoApp from './ToDoApp/todoApp';

class App extends Component{
    render(){
        return (
            <div className="App">
              {/* <Counter/> */}
              <ToDoApp/>
            </div>
          );
    }
}

export default App;

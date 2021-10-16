import React, {Component} from 'react';
import './App.css';
import FirstComponent, {SecondComponent} from './Components/examples/FirstComponent';

class App extends Component{
    render(){
        return (
            <div className="App">
              Hello world
              <FirstComponent/>
              <SecondComponent/>
              <ThirdComponent/>
            </div>
          );
    }
}

function ThirdComponent(){
    return(
        <div>
            ThirdComponent
        </div>
    );
}

export default App;

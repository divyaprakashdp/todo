import React, {Component} from 'react';
import './counter.css'
import PropTypes from 'prop-types'

export default class Counter extends Component{

    constructor(){
        super() //Error no 1
        this.state = {
            counter:0
        }
        this.increment = this.increment.bind(this) //bind the function
    }

    render(){
        return (
            <div className="Counter">
              <CounterButton by={1} incrementMethod={this.increment}/>
              <CounterButton by={5} incrementMethod={this.increment}/>
              <CounterButton by={10} incrementMethod={this.increment}/>
              <span id="Num">{this.state.counter}</span>
            </div>
          );
    }

    increment(by){
        console.log(`increment from parent - ${by}`)
        this.setState({
                counter:this.state.counter + by
        })

    }
}

 class CounterButton extends Component{

    //define the intial statein a constructor
    //state -> counter=0
    constructor(){
        super() //Error no 1
        this.state = {
            counter:0
        }
        this.increment = this.increment.bind(this) //bind the function
    }

    render(){
        return(
            <div className="CounterButton">
                <button onClick={this.increment}>+{this.props.by}</button>
                <span id="Num">{this.state.counter}</span>
            </div>
            
        )
    }
    

    increment(){
        this.setState({counter : this.state.counter+this.props.by})
        this.props.incrementMethod(this.props.by)
    }
}

//setting value for counter, in case if the counter value is nit provided
Counter.defaultProps = {
    by: 1
}
//
Counter.propTypes = {
    by: PropTypes.number
}

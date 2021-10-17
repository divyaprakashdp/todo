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
        this.decrement = this.decrement.bind(this) //bind the function
        this.reset = this.reset.bind(this)
    }

    render(){
        return (
            <div className="Counter">
              <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}/>
              <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
              <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}/>
              <span id="Num">{this.state.counter}</span>
              <div><button className="reset" onClick={this.reset}>Reset</button></div>
            </div>
          );
    }

    reset(){
        console.log("Reset Counter")
        this.setState( {counter: 0})
    }

    increment(by){
        console.log(`increment from parent - ${by}`)
        this.setState(
            (prevState) =>{
               return {counter:prevState.counter + by}
        })

    }

    decrement(by){
        console.log(`decrement from parent - ${by}`)
        this.setState(
            (prevState) =>{
               return {counter:prevState.counter - by}
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
        this.decrement = this.decrement.bind(this) //bind the function
    }

    render(){
        return(
            <div className="CounterButton">
                <button onClick={this.increment}>+{this.props.by}</button>
                <button onClick={this.decrement}>-{this.props.by}</button>
            </div>
            
        )
    }
    

    increment(){
        this.setState(
            (prevState) => {
                return {counter : prevState.counter+this.props.by}
            })
        this.props.incrementMethod(this.props.by)
    }

    decrement(){
        this.setState(
            (prevState) => {
                return {counter : prevState.counter-this.props.by}
            })
        this.props.decrementMethod(this.props.by)
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

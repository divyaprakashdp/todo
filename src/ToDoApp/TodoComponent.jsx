import { Formik, Form } from "formik";
import moment from "moment";
import React, { Component } from "react";

class TodoComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: "Learn Forms",
            targetDate: moment(new Date()).format('DD-MM-YYYY')
        }
    }
    render(){
        return <div>
            <h1>Todo Component</h1>

            <div className="container">
                <Formik>
                    {
                        (props) => (
                            <Form>Something</Form>
                        )
                    }
                </Formik>
            </div>

        </div>
    }
}
export default TodoComponent;
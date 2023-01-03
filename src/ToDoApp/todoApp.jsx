import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HelloWorldService from '../api/todo/HelloWorldService.js'
import withNavigation from './withNavigation.jsx';
import withParams from './withParams.jsx';
import AuthenticatedRoute from './AuthenticatedRoute.jsx';
import LogoutComponent from './LogoutComponent.jsx';
import HeaderComponent from './HeaderComponent.jsx';
import FooterComponent from './FooterComponent.jsx';
import ListTodosComponent from './ListTodosComponent.jsx';
import ErrorComponent from './ErrorComponent.jsx';
import WelcomeComponent from './WelcomeComponent.jsx';
import LoginComponent from './LoginComponent.jsx';
import TodoComponent from './TodoComponent.jsx';


class ToDoApp extends Component {


    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        const TodoComponentWithParamsAndNavigation = withParams(TodoComponent);
        
        // const Au
        return (
            <div className='container'>

                <Router>
                    <HeaderComponentWithNavigation />
                    <Routes>

                        <Route path="/" element={<LoginComponentWithNavigation />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />

                        <Route path="/welcome/:name" element={<AuthenticatedRoute><WelcomeComponentWithParams /></AuthenticatedRoute>} />
                        <Route path="/todos/:id" element={<AuthenticatedRoute><TodoComponentWithParamsAndNavigation /></AuthenticatedRoute>} />
                        <Route path="/todos" element={<AuthenticatedRoute><ListTodosComponent /></AuthenticatedRoute>} />
                        <Route path="/logout" element={<LogoutComponent />} />
                        

                        <Route path="*" element={<ErrorComponent />} />
                        
                    </Routes>
                    <FooterComponent />
                </Router>
                {/* <LoginComponent/> */}
                {/* <WelcomeComponent/> */}
            </div>
        )
    }
}

export default ToDoApp
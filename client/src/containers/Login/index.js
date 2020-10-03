import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./style.css";


class Login extends Component {
    render() {
        return <div className="loginContainer">
            <div className="logo"></div>
            <LoginForm id="loginForm" onLogin={this.props.onLogin} />
            <br/>
            <div>
                <h8>Need an account?</h8>
                <Link to="/register" className="nav-link registerAccount" id="registerLink">Register here.</Link>
            </div>
        </div>
    }
}

export default Login;
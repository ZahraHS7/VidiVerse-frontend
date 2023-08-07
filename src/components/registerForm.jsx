import React from 'react';
import Joi from "joi-browser";
import Form from './common/form';
import * as userService from '../services/userService';
import auth from '../services/authService';
import { Link } from 'react-router-dom';

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name:"" },
    errors: {},
  };

  schema = {
    username: Joi.string()
    .required()
    .email()
    .label("Username"),
    password: Joi.string()
    .min(5)
    .required()
    .label("Password"),
    name: Joi.string()
    .required()
    .label("Name")
  };

  doSubmit = async () => {
    try{
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = '/';
    }
    catch(ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="log-register-container">
        <div className="form-container">
          <h1>Sign up</h1>
          <form onSubmit={this.handleSubmit} >
            {this.renderInput("name", "Name")}
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Register")}
            </form>
            <div style={{ textAlign: "center" }}>
              <Link to='/login' style={{ textDecoration: "none" }}>Log in</Link>
            </div>
        </div>
      </div>
    )
  };
}

export default RegisterForm;
import React from 'react';
import { Redirect } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import Joi from "joi-browser";
import Form from './common/form';
import auth from '../services/authService';

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string()
    .required()
    .email()
    .label("Username"),
    password: Joi.string()
    .required()
    .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/" ;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = {...this.state.errors};
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  responseMessage = async (response) => {
    try {
      await auth.loginwithGoogle(response.credential);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/" ;
    }
    catch(ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  errorMessage = (error) => {
    toast.error('Error sign up:', error);
  };

  render() {
    if(auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div className="log-register-container">
        <div className="form-container">
          <h1>Log in</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
          </form><hr/>
          <div className="px-5 m-2">
              <GoogleLogin
                onSuccess={credentialResponse => {
                  this.responseMessage(credentialResponse);
                }}
                onError={this.errorMessage}
                theme="filled_blue"
                shape="circle"
                text="continue_with"
              />
            </div>
        </div>
      </div>
    );
  };
}

export default LoginForm;
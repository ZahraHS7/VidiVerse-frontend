import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Joi from 'joi-browser';
import Form from './common/form';
import { updateUser } from '../services/userService';
import auth from '../services/authService';


class Profile extends Form {
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

  async componentDidMount() {
    try {
      const user = auth.getCurrentUser();
      this.setState({ data: this.mapToViewModel(user) });
    } catch (ex) {
      console.error('Error fetching user data:', ex);
    }
  }

  mapToViewModel(user) {
    return {
      username: user.email,
      name: user.name,
    };
  }

  doSubmit = async () => {
    try {
      await updateUser(this.state.data);
      toast.success('User information updated successfully!');
    } catch (ex) {
      toast.error('Error updating user data:', ex);
    }
  };

  render() {
    const { name } = this.state.data;

    return (
      <div className='log-register-container'>
        <div className='form-container'>
          <h3>Welcome {name} ×͜×</h3>
          <p>You can change your information here<br/>
          &#9888;Caution what you change&#9888;</p>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput('username', 'Username')}
            {this.renderInput('name', 'Name')}
            {this.renderInput('password', 'Password', 'password')}
            {this.renderButton('Update')}
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;
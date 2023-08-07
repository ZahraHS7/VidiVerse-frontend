import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { saveCustomer, getCustomers } from '../services/customerService';
import { saveRental } from '../services/rentalService';
import { toast } from 'react-toastify';

class CustomerForm extends Form {
  state = {
    data: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      postcode: '',
      isGold: false,
    },
    errors: {},
    movie: null,
    customerId: null
  };

  schema = {
    _id: Joi.string(),
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    email: Joi.string().email().required().label('Email'),
    phone: Joi.number().required().label('Phone'),
    postcode: Joi.number().required().label('Postcode'),
    isGold: Joi.boolean()
  };

  doSubmit = async () => {
    try {
      if (this.props.showCustomerForm) {
        // If the form is used for creating a rental
        const movieId = this.props.movie;

        const rentalData = {
          customerId: this.state.data._id,
          movieId: movieId,
        };
        // Check if the customer with the given email already exists
        const { data: customers } = await getCustomers();
        const existingCustomer = customers.find(
          (customer) => customer.email === this.state.data.email
        );

        if (existingCustomer) {
          // If customer exists, use their ID for the rental
          rentalData.customerId = existingCustomer._id;
        } else {
          // If customer does not exist, create a new customer
          const { data: customer } = await saveCustomer({ ...this.state.data });
          rentalData.customerId = customer._id;
        }
        try {
          await saveRental(rentalData);
          toast.success('Rental created successfully.');

          window.location = '/rentals';
        } catch (ex) {
          if (ex.response && ex.response.status === 400) {
            toast.error(ex.response.data);
          } else {
            toast.error('An error occurred while creating the rental.');
          }

        }

      } else {
        // If the form is used for saving a new customer
        await saveCustomer({ ...this.state.data });
        toast.success('Customer added successfully.');
        this.props.history.goBack();
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error('Customer with this email already exists.');
      }
    }
  };

  render() {
    const { showCustomerForm } = this.props;

    return (
      <div className='customer-container mx-auto'>
        <h3>{showCustomerForm ? 'Rent Movie' : 'Customer'}</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('firstName', 'First Name')}
          {this.renderInput('lastName', 'Last Name')}
          <div className="col w-75">
            {this.renderInput('email', 'Email', 'email')}
          </div>
          <div className="col-md-6">
            {this.renderPhoneInput('phone', 'Phone')}
          </div>
          <div className="col-md-6">
            {this.renderInput('postcode', 'Postcode')}
          </div>
          {showCustomerForm ? (
            this.renderButton('Rent')
          ) : (
            this.renderButton('Save')
          )}
        </form>
      </div>
    );

  }
}

export default CustomerForm;

import React, { Component } from 'react';
import Joi from "joi-browser";
import Input from './input';
import Select from './select';
import PhoneInputField from './phoneInputField';
class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for(let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };


  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget : input }) => {
    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data};
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleFileChange = (event) => {
    const files = event.target.files;
    const moviePics = [...this.state.data.moviePics];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      moviePics.push(URL.createObjectURL(file));
    }

    this.setState({ data: { ...this.state.data, moviePics } });
  };

  renderButton(label) {
    return(
    <button disabled={this.validate()} className="btn btn-primary mt-3">
      {label}
    </button>
    );
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
     <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderPhoneInput(name, label) {
    const { data, errors } = this.state;

    return (
      <PhoneInputField
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderFileInput(name, label) {
    const { data, errors } = this.state;

    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          type="file"
          className="form-control-file d-block"
          id={name}
          name={name}
          onChange={this.handleFileChange}
          error={errors[name]}
          multiple // Allow multiple file selection
        />
        {data.moviePics.length > 0 && (
          <div className="movie-pics-preview">
            {data.moviePics.map((picUrl, index) => (
              <img
                key={index}
                src={picUrl}
                alt={`Movie Pic ${index + 1}`}
                className="movie-pic-thumbnail"
              />
            ))}
          </div>
        )}
        {errors[name] && <div className="alert alert-danger">{errors[name]}</div>}
      </div>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
      name={name}
      value={data[name]}
      label={label}
      options={options}
      onChange={this.handleChange}
      error={errors[name]}
      />
    )
  }
}

export default Form;

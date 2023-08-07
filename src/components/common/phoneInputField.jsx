import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneInputField = ({ name, label, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <PhoneInput
        country={'us'} // Set the initial country (you can change it as needed)
        value={value}
        onChange={(phone) => onChange({ currentTarget: { name, value: phone } })}
        inputProps={{
          name,
          required: true,
        }}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default PhoneInputField;

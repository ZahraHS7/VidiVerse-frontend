import React, { Component } from 'react';
import { Link } from "react-router-dom";
import auth from '../services/authService';
import Table from './common/table';

class CustomerTable extends Component {
  columns = [
    {
      path: 'firstName',
      label: 'First Name',
      content: customer => {
        const user = auth.getCurrentUser();
        return (user && user.isAdmin) ?
       <Link to={`/customers/${customer._id}`}>{customer.firstName}</Link>
        :
       customer.firstName;
      }
    },
    { path: 'lastName', label: 'Last Name' },
    {
      path: 'isGold',
      label: 'Is Gold',
      content: customer => (customer.isGold ? 'YES' : 'NO'),
    },
  ];

  deleteColumn = {
    key: 'delete',
    content: customer => (
      <button
        onClick={() => this.props.onDelete(customer)}
        className="btn btn-success btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push({ path: 'email', label: 'Email' });
      this.columns.push({ path: 'phone', label: 'Phone' });
      this.columns.push({ path: 'postcode', label: 'Postcode' });
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { customers, onSort, sortColumn } = this.props;

    return (
      <div style={{ overflowX: 'scroll' }}>
        <Table
          columns={this.columns}
          data={customers}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    );
  }
}

export default CustomerTable;

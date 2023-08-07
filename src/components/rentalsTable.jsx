import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Table from './common/table';

class RentalsTable extends Component {
  columns = [
    {
      path: 'movie.title',
      label: 'Title',
      content: rental => {
        return (
          <div className="d-flex align-items-center">
          <Link to={`/moviePage/${rental.movie._id}`}>
            <span className="text-left flex-grow-1">{rental.movie.title}</span>
          </Link>
          </div>
        )
      },
    },
    {
      path: 'customer.lastName',
      label: 'Customer',
      content: rental => {
        return (
          <div className="d-flex align-items-center">
          <Link to={`/customers/${rental.customer._id}`}>
            <span className="text-left flex-grow-1">{rental.customer.lastName}</span>
          </Link>
          </div>
        )
      },
    },
    { path: 'movie.dailyRentalRate', label: 'Rate' },
    { path: 'dateOut', label: 'Date Out', content: rental => rental.dateOut },
    { path: 'dateReturned', label: 'Date Returned', content: rental => rental.dateReturned || '-' },
    { path: 'rentalFee', label: 'Rental Fee', content: rental => rental.rentalFee || 0 },
    {
      path: 'status',
      label: 'Status',
      content: rental => (rental.dateReturned ? 'Returned' : 'Rented'),
    },
    {
      key: 'action',
      content: rental => (
        <button
          onClick={() => this.props.onRentOrReturn(rental)}
          className={`btn btn-sm ${rental.dateReturned ? 'btn-success' : 'btn-primary' }`}
        >
          {rental.dateReturned ? 'Rent' : 'Return'}
        </button>
      ),
    }
  ];

  render() {
    const { rentals, onSort, sortColumn } = this.props;

    return (
      <Table
      columns={this.columns}
      data={rentals}
      sortColumn={sortColumn}
      onSort={onSort} />
    );
  }
}

export default RentalsTable;
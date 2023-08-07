import React, { Component } from 'react';
import { getCustomers, deleteCustomer } from '../services/customerService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import CustomerTable from './customerTable';
import Pagination from './common/pagination';
import SearchBox from './searchBox';
import Container from './common/container';
import { paginate } from '../utils/paginate';
import _ from 'lodash';

class Customers extends Component {
  state = {
    customers: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: 'firstName', order: 'asc' }
  };

  async componentDidMount() {
    this.fetchCustomers();
  }

  fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      this.setState({ customers: response.data });
    } catch (error) {
      console.log("Error fetching customers:", error);
    }
  };

  handleDelete = async customer => {
    const originalCustomers = this.state.customers;
    const customers = originalCustomers.filter(c => c.id !== customer.id);
    this.setState({ customers });

    try {
      await deleteCustomer(customer._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This customer has already been deleted.");
      }
      this.setState({ customers: originalCustomers });
    }
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      customers: allCustomers
    } = this.state;

    let filtered = allCustomers;
    if (searchQuery){
      filtered = allCustomers.filter(c =>
        c.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.lastName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

      const customers = paginate(sorted, currentPage, pageSize);

      return { totalCount: filtered.length, data: customers };
    }
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const { totalCount, data: customers } = this.getPagedData();

    return (
      <Container className="movies-container">
        <h1 className="mb-4 mt-2 text-center">Customers</h1>
        <div className="row">
          <div className="col-lg-0">
            {/* First column content */}
          </div>
          <div className="col-lg-12 mx-1">
            <Link to="/customers/new" className="btn btn-primary mt-3">
              New Customer
            </Link>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <CustomerTable
              customers={customers}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <p>Total customers : {totalCount}</p>
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
          <div className="col-lg-0">
            {/* Third column content */}
          </div>
        </div>
      </Container>
    );
  }
}

export default Customers;

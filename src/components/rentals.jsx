import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { getRentals, getRental } from '../services/rentalService';
import { returnRental } from '../services/returnService';
import { paginate } from '../utils/paginate';
import auth from '../services/authService';
import Container from './common/container';
import CustomerForm from './customerForm';
import RentalsTable from './rentalsTable';
import Pagination from './common/pagination';
import SearchBox from './searchBox';

class Rentals extends Component {
  state = {
    rentals: [],
    customer: [],
    currentPage: 1,
    pageSize: 6,
    searchQuery: "",
    sortColumn: { path: 'dateOut', order: 'asc'},
    showCustomerForm: false, // Add this state to control the visibility of the customer form
    selectedMovie: null
  };

  async populateRentals() {
    const { data: rentals } = await getRentals();
    this.setState({ rentals });
  }

  async componentDidMount() {
    // Check if the movieId is present in the query parameter
    const params = new URLSearchParams(this.props.location.search);
    const movieId = params.get("movieId");
    if (movieId) {
      // Set the selectedMovieId in the state and show the CustomerForm
      this.setState({ selectedMovie: movieId, showCustomerForm: true });
    }
    await this.populateRentals();
  }

  handleRentMovie = async (rental) => {
    try {
      const { data: fetchedRental } = await getRental(rental._id);
      const movieId = fetchedRental.movie._id;

      this.setState({ showCustomerForm: true, selectedMovie: movieId });
      this.props.history.replace("/rentals");
    } catch(ex) {
      toast.error('Failed to rent the movie.');
    }
  };

  handleReturn = async (rental) => {
    try {
      // Fetch the rental details using rental._id
      const { data: fetchedRental } = await getRental(rental._id);

      // Extract the customerId and movieId from the fetched rental
      const customerId = fetchedRental.customer._id;
      const movieId = fetchedRental.movie._id;

      try {
        await returnRental(customerId, movieId);
        toast.success('Movie returned successfully.');
        window.location.reload();
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          toast.error('Return is already processed.');
        }
      }

    } catch (error) {
      toast.error('Failed to return the movie.');
    }
  };


  handleRentOrReturn = async rental => {
    const user = auth.getCurrentUser();
    if (user) {
      if (rental.dateReturned) {
        this.handleRentMovie(rental);
      } else {
        this.handleReturn(rental);
      }
    } else {
      this.props.history.replace('/register');
      toast.error('Only users can rent or return movies.');
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
      rentals: allRentals
    } = this.state;

    let filtered = allRentals;
    if (searchQuery)
      filtered = allRentals.filter(r =>
        r.movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else
      filtered = allRentals;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const rentals = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: rentals };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery} = this.state;
    const { totalCount, data: rentals } = this.getPagedData();

    return (
      <Container className="movies-container">
        <div className="row">
          <div className="col-lg-0">
            {/* First column content */}
          </div>
          <div className="col-lg-12 my-3">
            {this.state.showCustomerForm && (
              <CustomerForm
              movie={this.state.selectedMovie}
              showCustomerForm={this.state.showCustomerForm}
              />
            )}
            <Link to="/movies" className="btn btn-primary my-3">
              New Rent
            </Link>
              <SearchBox value={searchQuery} onChange={this.handleSearch} />
              <RentalsTable
                rentals={rentals}
                sortColumn={sortColumn}
                onDelete={this.handleDelete}
                onLike={this.handleLike}
                onRent={this.handleRentMovie}
                onReturn={this.handleReturn}
                onSort={this.handleSort}
                onRentOrReturn={this.handleRentOrReturn}
              />
              <p>Total : {totalCount}</p>
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

export default Rentals;
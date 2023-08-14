import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { BsClock } from 'react-icons/bs';
import { addFavoriteMovie, deleteFavoriteMovie, getMyProfile } from '../services/userService';
import auth from '../services/authService';
import Like from './common/like';
import Table from './common/table';
import { toast } from 'react-toastify';

class MoviesTable extends Component {
  state = {
    favoriteMovies: [], // Store the favorite movies for the current user
  };

  async componentDidMount() {
    const user = auth.getCurrentUser();

    if (user) {
      const { data: userProfile } = await getMyProfile();
      const favoriteMovies = userProfile.favoriteMovies.map(movie => movie._id);
      this.setState({ favoriteMovies });
    }
  }

  columns = [
    {
      path: 'title',
      label: 'Title',
      content: movie => {
        return (
          <div className="d-flex align-items-center">
            <img src={movie.posterURL} alt={movie.title} style={{ width: '50px', marginRight: '10px' }} />
              <div>
                <Link to={`/moviePage/${movie._id}`}>
                  <span className="text-left flex-grow-1">{movie.title}</span>
                </Link>
                <p className="text-left flex-grow-1" style={{ fontSize: "12px" }}>
                  {movie.releaseDate} - {movie.ageRating} - {movie.duration} <BsClock style={{ display: "inline" }}/> <br/>
                  {movie.cast}
                </p>
              </div>
          </div>
        );
      },
    },
    { path: 'genre.type', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: movie => (
        <Like
          onLikeToggle={() => this.handleLikeToggle(movie)}
          isFavorite={this.state.favoriteMovies.includes(movie._id)}
        />
      )
    },
    {
      key: 'Rent',
      content: movie => (
        <button
        onClick={() => this.props.onRent(movie)}
        className="btn btn-success btn-sm">Rent</button>
      )
    }
  ];

  deleteColumn = {
    key: 'delete',
    content: movie => (
      <button
      onClick={() => this.props.onDelete(movie)}
      className="btn btn-success btn-sm">Delete</button>
    )
  };

  editColumn = {
    key: 'edit',
    content: movie => (
      <Link to={`/movies/${movie._id}`} className="btn btn-success btn-sm">
        Edit
      </Link>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.editColumn);
      this.columns.push(this.deleteColumn);
    }
  }

  handleLikeToggle = async (movie) => {
    const { favoriteMovies } = this.state;
    const user = auth.getCurrentUser();

    if (!user) {
      toast.error(() => (
        <div>
          <p>Only users can add movies to favorites.</p>
          <Link to="/register" className="btn btn-success btn-sm">
            Register
          </Link>
        </div>
      ));

      return;
    } else {
      if (favoriteMovies.includes(movie._id)) {
        await deleteFavoriteMovie(movie._id);
        const updatedFavorites = favoriteMovies.filter(id => id !== movie._id);
        this.setState({ favoriteMovies: updatedFavorites });
        toast.success("Movie removed from favorites")
      } else {
        await addFavoriteMovie(movie._id);
        const updatedFavorites = [...favoriteMovies, movie._id];
        this.setState({ favoriteMovies: updatedFavorites });
        toast.success("Movie added to favorites")
      }
    }
  };

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
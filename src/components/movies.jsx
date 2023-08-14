import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import auth from '../services/authService';
import Pagination from './common/pagination';
import MoviesTable from './moviesTable';
import SearchBox from './searchBox';
import ListGroup from './common/listGroup';
import Container from './common/container';
import { paginate } from '../utils/paginate';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc'},
    selectedMovieForRent: null
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id:'', type: "All Genres" }, ...data ];

    const { data: movies } = await getMovies();
    this.setState({ movies , genres, selectedGenre: genres[0] });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m.id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
      const { data: updatedMovies } = await getMovies();
      this.setState({ movies: updatedMovies });
      this.props.history.replace("/movies");
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted.");
      }
      this.setState({ movies: originalMovies });
    }
  };

  handleRent = async movie => {
    const user = auth.getCurrentUser();
    if (user) {
      this.props.history.replace({
        pathname: "/rentals",
        search: `?movieId=${movie._id}`,
      });
    } else {
      this.props.history.replace("/register");
      toast.error("Only users can rent movies.");
    }
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    // const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery} = this.state;
    const { user } = this.props;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <Container className="movies-container">
        <div className="row">
          <div className="col-lg-2 my-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col-lg-10">
            {user && (
              <Link to="/movies/new" className="btn btn-primary mt-3">
                New Movie
              </Link>
            )}
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onRent={this.handleRent}
              onSort={this.handleSort}
              />
            <p>Total movies : {totalCount}</p>
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

export default Movies;
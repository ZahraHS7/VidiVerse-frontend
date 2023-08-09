import React, { useEffect, useState } from 'react';
import Carousel from './common/carousel';
import MovieFlexBox from './movieFlexBox';
import { getMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import { useParams, useHistory, Link } from 'react-router-dom';
import { BsClock } from 'react-icons/bs';
import { toast } from 'react-toastify';
import auth from '../services/authService';

const MoviePage = () => {
  const [movie, setMovie] = useState(null);
  const [randomGenres, setRandomGenres] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const user = auth.getCurrentUser();

  useEffect(() => {
    fetchMovie();
    fetchRandomGenres();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const { data } = await getMovie(id);
      setMovie(data);
    } catch (error) {
      toast.error('Error fetching movie:', error);
      history.push('/not-found');
    }
  };

  const fetchRandomGenres = async () => {
    try {
      const { data: genres } = await getGenres();
      const availableGenres = genres.filter((g) => g.type !== movie?.genre.type);
      const shuffledGenres = availableGenres.sort(() => Math.random() - 0.5);
      setRandomGenres(shuffledGenres.slice(0, 2));
    } catch (error) {
      toast.error('Error fetching genres:', error);
    }
  };

  const getMoviePictures = (movie) => {
    return movie ? movie.moviePics : [];
  };

  const renderRentButton = () => {
    if (user) {
      return (
        <Link to={`/rentals?movieId=${movie?._id}`} className="btn btn-success">
          Rent
        </Link>
      );
    } else {
      return (
        <Link to="/register" className="btn btn-primary">
          Sign Up
        </Link>
      );
    }
  };

  return (
    <div>
      <div className="carousel-wrapper">
        <div className="col-md-6">
          {movie && <Carousel images={getMoviePictures(movie)} interval={5000} />}
        </div>
        <div className="col-md-6 movie-details">
          <h4>{movie?.title}</h4>
          <span>{movie?.releaseDate} - {movie?.ageRating} - {movie?.duration} <BsClock style={{ display: "inline", fontSize: "13px" }}/><br/>
          <strong>{movie?.genre.type}</strong><hr/>
          {movie?.summary}<hr/>
          <strong>Director</strong> {movie?.director}<hr/>
          <strong>Stars</strong>  {movie?.cast}</span><br/><br/>
          {renderRentButton()}
        </div>
      </div>
      <div className="row mt-5 movieFlexHeader">
        <div>
          <h4>{movie?.genre.type}</h4>
          <MovieFlexBox type="genre" data={movie?.genre.type} />
        </div>
      </div>
      <div className="row mt-5 movieFlexHeader">
        {randomGenres[0] && (
          <div>
            <h4>{randomGenres[0].type}</h4>
            <MovieFlexBox type="genre" data={randomGenres[0].type} />
          </div>
        )}
      </div>
      <div className="row mt-5 movieFlexHeader">
        {randomGenres[1] && (
          <div>
            <h4>{randomGenres[1].type}</h4>
            <MovieFlexBox type="genre" data={randomGenres[1].type} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviePage;

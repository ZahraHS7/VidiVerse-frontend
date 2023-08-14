import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsClock } from 'react-icons/bs';
import { getMyProfile, deleteFavoriteMovie } from '../../services/userService';
import { cactus } from '../../pics';

const Sidebar = ({ isOpen, onClose }) => {
  const sidebarRef = useRef(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      const { data: userProfile } = await getMyProfile();
      setFavoriteMovies(userProfile.favoriteMovies);
    };

    if (isOpen) {
      fetchUserFavorites();
    }
  }, [isOpen]);

  const handleDeleteMovie = async (movieId) => {
    await deleteFavoriteMovie(movieId);
    setFavoriteMovies((prevFavorites) =>
      prevFavorites.filter((movie) => movie._id !== movieId)
    );
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`sidebar ${isOpen ? 'show' : ''}`}>
      <div className={`sidebar-backdrop ${isOpen ? 'show' : ''}`} onClick={onClose}></div>

      <div className="sidebar-content" ref={sidebarRef}>
        <div className="sidebar-header">
          <h5 className="sidebar-title">Favorite Movies</h5>
          <button className="close-btn" onClick={onClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="sidebar-body">
        <div className="favorite-movies-container">
            {favoriteMovies.length > 0 ? (
              favoriteMovies.map((movie) => (
                <div key={movie._id} className="favorite-movie">
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
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteMovie(movie._id)}
                    >
                      &#x2716;
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-favorites d-flex justify-content-center flex-column">
                <img src={cactus} alt="cactus" />
                <p>Oops! No favorite movies yet.</p>
                <Link to='./movies' className="btn btn-success btn-sm">Explore movies page</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMovies } from '../services/movieService';
import { getGenres } from '../services/genreService';
import auth from '../services/authService';
import HomeCarousel from './common/homeCarousel';
import MovieFlexBox from './movieFlexBox';
import ImageWithContent from './imageWithContent';
import * as Pics from '../pics';

const Home = () => {
  const [latestMovies, setLatestMovies] = useState([]);
  const [randomGenres, setRandomGenres] = useState([]);
  const user = auth.getCurrentUser();

  useEffect(() => {
    fetchLatestMovies();
    fetchRandomGenres();
  }, []);

  const fetchLatestMovies = async () => {
    try {
      const { data: allMovies } = await getMovies();

      allMovies.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

      const latestMovies = allMovies.slice(0, 5);

      setLatestMovies(latestMovies);
    } catch (error) {
      toast.error('Error fetching movies:', error);
    }
  };

  const fetchRandomGenres = async () => {
    try {
      const { data: genres } = await getGenres();
      const availableGenres = genres.filter(
        (genre) => !latestMovies.some((movie) => movie.genre.type === genre.type)
      );
      const shuffledGenres = availableGenres.sort(() => Math.random() - 0.5);
      setRandomGenres(shuffledGenres.slice(0, 2));
    } catch (error) {
      toast.error('Error fetching genres:', error);
    }
  };

  const images = latestMovies.map((movie) => movie.moviePics[0]);

  return (
    <div>
      <div className="row">
        <div>
          <HomeCarousel movies={latestMovies} images={images} />
        </div>
      </div>
        <ImageWithContent
          imageSrc={Pics.film}
          altText="film"
          content={
            <>
              <h2 >Step into the mesmerizing realm of VidiVerse</h2>
              <p>
              Hey there, movie buffs! Say hello to VidiVerse - your go-to hub for the most thrilling movie nights ever!
              Get ready to dive into a world of captivating entertainment that'll leave you spellbound!
              </p>
              <p>
              &#128757; No more tedious trips to the store or fumbling with discs. With VidiVerse, movie magic comes straight to your doorstep with FREE delivery!
              Yeah, you heard that right - no extra charges, just pure cinematic joy delivered right to your living room!
              </p>
              <p>
              &#128192; We know quality is king when it comes to movie watching.
              That's why VidiVerse serves up nothing but the best, jaw-dropping video quality! Brace yourself for razor-sharp visuals that'll transport you into the heart of your favorite flicks.
              </p>
            </>
          }
          imagePosition="right"
        />
        <ImageWithContent
            imageSrc={Pics.popcornFilm}
            altText="popcorn"
            content={
              <>
                <h2 >Join the VidiVerse crew now and unleash the movie aficionado within you! </h2>
                <p>
                &#127902; Action, romance, comedy, drama - whatever your flavor, VidiVerse has got you covered!
                 Our vast collection boasts the latest blockbusters and timeless classics that'll cater to your every mood.
                </p>
                <p>
                &#127871; Get comfy, grab your popcorn, and let VidiVerse take you on a wild ride through the silver screen's wonders!
                 Our user-friendly platform ensures you'll find your flick in a jiffy - no hassle, just movie magic at your fingertips.
                </p>
                <p>
                So, why wait? Let the reel adventures begin!
                </p>
                {user && (
                  <Link to='/movies' className="btn btn-success">
                    View Movies
                  </Link>
                )}
                {!user && (
                  <Link to="/register" className="btn btn-primary">
                    Sign Up
                  </Link>
                )}
              </>
            }
            imagePosition="left"
          />
      <div className="row" style={{ textAlign: "center", marginTop: "50px" }}>
        <div>
          <h2 style={{ textAlign: "center", marginBottom: "10px" }}>New Film Releases to Rent</h2>
          <MovieFlexBox type="movie" data={latestMovies} />
        </div>
      </div>
      <div className="row mt-5">
        {randomGenres[0] && (
          <div>
            <h3 style={{ textAlign: "center", margin: "6px" }}>{randomGenres[0].type}</h3>
            <MovieFlexBox type="genre" data={randomGenres[0].type} />
          </div>
        )}
      </div>
      <div className='how-it-works mt-4'>
          <img src={Pics.watcingTV} alt="watching TV"/>
          <div className="centerFlex">
          <h2>How it works</h2>
            <div className="flex-item">
              <i className="fa fa-laptop" aria-hidden="true"/>
              <h4>Choose</h4>
            </div>
            <div className="flex-item">
              <i className="fa fa-motorcycle" aria-hidden="true"/>
              <h4>Receive</h4>
            </div>
            <div className="flex-item">
              <i className="fa fa-television" aria-hidden="true"/>
              <h4>Watch</h4>
            </div>
            <div className="flex-item">
              <i className="fa fa-envelope" aria-hidden="true"/>
              <h4>Return</h4>
            </div>
          </div>
          {user && (
            <Link to='/movies' className="btn btn-success signBtn">
              View Movies
            </Link>
          )}
          {!user && (
            <Link to="/register" className="btn btn-primary signBtn">
              Sign Up For Free
            </Link>
          )}
      </div>
    </div>
  );
};

export default Home;

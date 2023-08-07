import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import Loading from './components/common/loading';
import ProtectedRoute from './components/common/protectedRoute';
import Home from './components/home';
import LoginForm from './components/loginForm';
import Logout from './components/logout';
import RegisterForm from './components/registerForm';
import Profile from './components/profile';
import Movies from './components/movies';
import MovieForm from './components/movieForm';
import MoviePage from './components/moviePage';
import Customers from './components/customers';
import CustomerForm from './components/customerForm';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import Footer from './components/footer';
import GoToTopButton from './components/common/goToTopButton';
import { ThemeProvider } from './components/common/theme';
import ThemeWrapper from './components/themeWrapper';
import auth from './services/authService';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setTimeout(async () => {
        try {
          const currentUser = await auth.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          toast.error('Error fetching user:', error);
        } finally {
          setIsLoading(false);
        }
      }, 2000);
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ThemeProvider>
      <ThemeWrapper>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container content">
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/profile" component={Profile} />
          <ProtectedRoute path="/movies/:id" component={MovieForm} />
          <Route path="/moviePage/:id" component={MoviePage} />
          <Route path="/movies" render={(props) => <Movies {...props} user={user} />} />
          <ProtectedRoute path="/customers/:id" component={CustomerForm} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/home" />
          <Redirect to="/not-found" />
        </Switch>
        </main>
        <Footer />
        <GoToTopButton/>
      </ThemeWrapper>
    </ThemeProvider>
  );
};

export default App;
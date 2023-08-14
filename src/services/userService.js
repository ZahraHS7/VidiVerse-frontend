import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/users";
const authToken = localStorage.getItem('token');

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}

export function registerWithGoogle(credential) {
  const userObject = jwtDecode(credential);
  const { email, given_name } = userObject;

  const password = Math.random().toString(36).slice(-8);

  return http.post(apiEndpoint, {
    email: email,
    password: password,
    name: given_name
  });
}

export function updateUser(user) {
  // Include the authentication token in the request headers
  return http.put(apiEndpoint + '/me', {
    email: user.username,
    password: user.password,
    name: user.name
  }, {
    headers: {
      'x-auth-token': authToken,
    },
  });
}

export function addFavoriteMovie(movieId) {
  return http.put(apiEndpoint + `/me/add-favorite-movie/${movieId}`, null, {
    headers: {
      'x-auth-token': authToken,
    },
  });
}

export function deleteFavoriteMovie(movieId) {
  return http.delete(apiEndpoint + `/me/delete-favorite-movie/${movieId}`, null, {
    headers: {
      'x-auth-token': authToken,
    },
  });
}

export function getMyProfile() {
  // Include the authentication token in the request headers
  return http.get(apiEndpoint + '/me', {
    headers: {
      'x-auth-token': authToken,
    },
  });
}
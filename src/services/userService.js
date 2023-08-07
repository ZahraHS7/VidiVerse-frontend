import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/users";

const authToken = localStorage.getItem('token');

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
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
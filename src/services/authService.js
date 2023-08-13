import http from "./httpService";
import jwtDecode from 'jwt-decode';

const apiEndpoint = "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt} = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export async function loginwithGoogle(credential) {
  const userObject = jwtDecode(credential);
  console.log(userObject);
  const { email } = userObject;

  const { data: jwt} = await http.post('/auth/google', {
    email: email
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  return localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  return localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try{
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  }catch(ex) {
      return null;
    }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  loginwithGoogle,
  logout,
  getCurrentUser,
  getJwt
};
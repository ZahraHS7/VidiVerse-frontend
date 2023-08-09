import http from "./httpService";

const apiEndpoint = "/returns";

export function returnRental(customerId, movieId) {
  return http.post(apiEndpoint, { customerId, movieId });
}
import http from "./httpService";

const apiEndpoint = "/rentals";

export function getRentals() {
  return http.get(apiEndpoint);
}

export function saveRental(rental) {
  return http.post(apiEndpoint, rental);
}

export function getRental(rentalId) {
  return http.get(`${apiEndpoint}/${rentalId}`);
}
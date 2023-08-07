import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/rentals";

export function getRentals() {
  return http.get(apiEndpoint);
}

export function saveRental(rental) {
  return http.post(apiEndpoint, rental);
}

export function getRental(rentalId) {
  return http.get(`${apiEndpoint}/${rentalId}`);
}
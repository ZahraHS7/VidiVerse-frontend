import http from "./httpService";

const apiEndpoint = "/customers";

function customerUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function register(customer) {
  return http.post(apiEndpoint, {
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    postcode: customer.postcode,
    isGold: customer.isGold
  });
}

export function getCustomers() {
  return http.get(apiEndpoint);
}

export function getCustomer(customerId) {
  return http.get(customerUrl(customerId));
}

export function saveCustomer(customer) {
  if (customer._id) {
    const body = { ...customer };
    delete body._id;
    return http.put(customerUrl(customer._id), body);
  }

  return http.post(apiEndpoint, customer);
}

export function deleteCustomer(customerId) {
  return http.delete(customerUrl(customerId));
}
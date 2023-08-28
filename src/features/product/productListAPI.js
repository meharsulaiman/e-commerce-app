export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    // TODO: Replace with real API call
    const response = await fetch('http://localhost:8080/products');
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilter(filter) {
  // TODO: handle multiple filters
  let Query = '';

  for (const key in filter) {
    Query += `${key}=${filter[key]}&`;
  }

  return new Promise(async (resolve) => {
    // TODO: Replace with real API call
    const response = await fetch(`http://localhost:8080/products?${Query}`);
    const data = await response.json();
    resolve({ data });
  });
}

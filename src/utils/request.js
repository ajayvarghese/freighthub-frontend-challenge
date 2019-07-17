export const request = (url, args = {}) => {
  const { method = "GET", body } = args;
  let headers = {};
  if(method === 'POST' || method === "DELETE" || method === "PUT") {
    headers = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }

  const fetchPromise = fetch(url, { method, body: JSON.stringify(body), ...headers });
  return method === 'PUT' ? fetchPromise
  : fetchPromise.then(async r => {
      const totalCount = r.headers.get('X-Total-Count');
      const response = await r.json();
      return totalCount ? { totalCount, response } : response;
    })
};

const BASE_URL = import.meta.env.DEV ? "http://localhost:2006" : "";

async function getJSON(path, params) {
  
  let urlString = `${BASE_URL}${path}`;
  
  
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    urlString += `?${queryString}`;
  }

  
  const res = await fetch(urlString);
  if (!res.ok) throw new Error("Request failed");
  return res.json();
}

  const res = await fetch(url);
  if (!res.ok) throw new Error("Request failed");
  return res.json();
}

export function fetchWorkTypes() {
  return getJSON("/angularfetchwork");
}

export function fetchCities() {
  return getJSON("/angularfetchcity");
}

export function fetchWorkers({ type, city }) {
  return getJSON("/fetchworker", { type, city });
}

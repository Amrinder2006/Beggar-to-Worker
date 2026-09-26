const BASE_URL = "http://localhost:2006"; // same as authService — set this or use a Vite proxy if frontend/backend run on different ports

async function getJSON(path, params) {
  const url = new URL(`${BASE_URL}${path}`, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
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
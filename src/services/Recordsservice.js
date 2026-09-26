const BASE_URL = "http://localhost:2006";

async function getJSON(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  const text = await res.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    // Backend sent a plain error string instead of JSON (e.g. a SQL error message)
    throw new Error(text || "Request failed");
  }

  if (!res.ok) throw new Error(text || "Request failed");
  return data;
}

async function postJSON(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text; // some routes reply with a plain string ("Updated Successfully" etc.)
  }

  if (!res.ok) throw new Error(typeof data === "string" ? data : "Request failed");
  return data;
}

export function fetchAllUsers() {
  return getJSON("/angularfetchall");
}

export function blockUser(email) {
  return postJSON("/onblock", { Email: email });
}

export function resumeUser(email) {
  return postJSON("/onresume", { Email: email });
}

export function fetchCitizens() {
  return getJSON("/fetchcitizens");
}

export function fetchBeggars() {
  return getJSON("/fetchbeg");
}

export function fetchVolunteers() {
  return getJSON("/fetchvol");
}
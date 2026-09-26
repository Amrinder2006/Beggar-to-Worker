// All calls point at the exact same backend routes your original
// jQuery $.ajax calls used. Nothing on the Node/Express side needs to change.

const BASE_URL = "http://localhost:2006"; // set this to your API origin if frontend & backend run on different ports, e.g. "http://localhost:5000"

async function postForm(path, data) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // Your backend currently responds with a plain string ("Volunteer", "Citizen",
  // "Valid", or an error string) rather than JSON, so we read it as text.
  const text = await res.text();

  if (!res.ok) {
    throw new Error(text || "Request failed");
  }

  return text;
}

export function signup({ username, email, password, userType }) {
  return postForm("/submit-process", {
    Username: username,
    Email: email,
    Password: password,
    UserT: userType,
  });
}

export function login({ email, password }) {
  return postForm("/login-process", {
    Email: email,
    Password: password,
  });
}

export function adminLogin({ email, password }) {
  return postForm("/admin-process", {
    Email: email,
    Password: password,
  });
}


const BASE_URL = import.meta.env.DEV ? "http://localhost:2006" : "";

async function postForm(path, data) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });


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

const BASE_URL = "http://localhost:2006"; // same note as authService.js — set this or use a Vite proxy if ports differ

async function postFormData(path, formData) {
  // No Content-Type header here on purpose — the browser sets the correct
  // multipart boundary automatically when the body is a FormData instance.
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    body: formData,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text || "Request failed");
  return text;
}

export function submitBeggar(formData) {
  return postFormData("/begsubmit-process", formData);
}

export function updateBeggar(formData) {
  return postFormData("/begupdate-process", formData);
}

export function submitVolunteer(formData) {
  return postFormData("/submitcred", formData);
}

export function updateVolunteer(formData) {
  return postFormData("/updatecred", formData);
}

export async function changePassword({ email, oldpass, newpass }) {
  const url = new URL(`${BASE_URL}/chngpass`, window.location.origin);
  url.searchParams.set("Email", email);
  url.searchParams.set("oldpass", oldpass);
  url.searchParams.set("newpass", newpass);

  const res = await fetch(url);
  const text = await res.text();
  if (!res.ok) throw new Error(text || "Request failed");
  return text;
}
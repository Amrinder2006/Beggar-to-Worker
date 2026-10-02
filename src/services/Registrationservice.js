const BASE_URL = import.meta.env.DEV ? "http://localhost:2006" : "";

async function postFormData(path, formData) {

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
  
  const params = new URLSearchParams({
    Email: email,
    oldpass: oldpass,
    newpass: newpass
  });

 
  const urlString = `${BASE_URL}/chngpass?${params.toString()}`;

  // 3. Fetch
  const res = await fetch(urlString);
  const text = await res.text();
  if (!res.ok) throw new Error(text || "Request failed");
  return text;
}

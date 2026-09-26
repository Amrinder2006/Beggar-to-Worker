const BASE_URL = "http://localhost:2006"; // same note as the other services — set this or use a Vite proxy if ports differ

export async function submitCitizenProfile(formData) {
  const res = await fetch(`${BASE_URL}/Citizen-Profile`, {
    method: "POST",
    body: formData, // FormData sets its own multipart Content-Type/boundary
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text || "Request failed");
  return text;
}
const BASE_URL = import.meta.env.DEV ? "http://localhost:2006" : "";

export async function submitCitizenProfile(formData) {
  const res = await fetch(`${BASE_URL}/Citizen-Profile`, {
    method: "POST",
    body: formData, 
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text || "Request failed");
  return text;
}

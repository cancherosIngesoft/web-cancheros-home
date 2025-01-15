export async function getRut(rut: File, requestId: string) {
  const formData = new FormData();
  formData.append("file", rut);
  const response = await fetch(
    `https://dev-canchas-service-259453285069.us-central1.run.app/api/requests/upload-rut/${requestId}`,
    {
      method: "POST",
      body: formData,
    }
  );

  return response.json();
}

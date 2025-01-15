export async function getRut(rut: File, requestId: string) {
  const formData = new FormData();
  formData.append("file", rut);
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/api/requests/upload-rut/${requestId}`,
    {
      method: "POST",
      body: formData,
    }
  );

  return response.json();
}

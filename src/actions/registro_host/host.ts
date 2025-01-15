export async function registerHost(formData: object) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/requests",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al registrar host");
    }

    return await response.json();
  } catch (error) {
    console.error("Register host error:", error);
    throw error;
  }
}

export async function registerHost(formData: object) {
  try {
    const response = await fetch(
      "https://dev-canchas-service-259453285069.us-central1.run.app/api/requests",
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

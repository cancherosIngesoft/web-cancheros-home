import { useGlobalStore, useShallow } from "@/store";

function ExampleComponent() {
  // 1. Obtener un solo valor del estado
  const userRole = useGlobalStore((state) => state.auth.userRole);

  //Obtener el slice del estado
  const auth = useGlobalStore((state) => state.auth);

  // 2. Obtener múltiples valores de forma eficiente usando useShallow
  // Esto previene re-renders innecesarios
  const { email, token } = useGlobalStore(useShallow((state) => state.auth));

  // 3. Obtener los métodos para actualizar el estado
  const updateStore = useGlobalStore((state) => state.updateStore);
  const clearStore = useGlobalStore((state) => state.clearStore);

  // 4. Ejemplo de actualización parcial del estado
  const handleUpdateUser = () => {
    /**
     * La sintaxis es: updateStore('slice', { propiedad: valor });
     */
    updateStore("auth", {
      email: "nuevo@email.com",
      // No necesitas incluir todas las propiedades, solo las que quieres actualizar
    });
  };

  // 5. Ejemplo de actualización múltiple
  const handleLogin = () => {
    updateStore("auth", {
      userRole: "admin",
      token: "abc123",
      email: "admin@example.com",
    });
  };

  // 6. Ejemplo de limpieza del estado (logout)
  const handleLogout = () => {
    clearStore("auth");
  };

  return (
    <div>
      {/* 7. Uso de los valores en el componente */}
      <p>Role: {userRole}</p>
      <p>Email: {email}</p>

      {/* 8. Botones de ejemplo */}
      <button onClick={handleUpdateUser}>Actualizar Email</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

// 9. Ejemplo de uso en un componente que solo necesita leer el estado
function ReadOnlyComponent() {
  // Solo obtén lo que necesites para evitar re-renders innecesarios
  const email = useGlobalStore((state) => state.auth.email);

  return <div>Email actual: {email}</div>;
}

// 10. Ejemplo de actualización condicional
function ConditionalUpdateComponent() {
  const updateStore = useGlobalStore((state) => state.updateStore);
  const userRole = useGlobalStore((state) => state.auth.userRole);

  const handleRoleUpdate = (newRole: string) => {
    if (userRole !== newRole) {
      updateStore("auth", { userRole: newRole });
    }
  };

  return <button onClick={() => handleRoleUpdate("admin")}>Hacer Admin</button>;
}

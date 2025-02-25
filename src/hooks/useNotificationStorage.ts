const TEMP_DELETED_CALIFICATIONS = "TEMP_DELETED_CALIFICATIONS";
const TEMP_DELETED_NOTIFICATIONS = "TEMP_DELETED_NOTIFICATIONS";

export function useNotificationStorage() {
  const getDeletedCalifications = (): number[] => {
    const stored = localStorage.getItem(TEMP_DELETED_CALIFICATIONS);
    return stored ? JSON.parse(stored) : [];
  };

  const getDeletedNotifications = (): number[] => {
    const stored = localStorage.getItem(TEMP_DELETED_NOTIFICATIONS);
    return stored ? JSON.parse(stored) : [];
  };

  const addDeletedCalification = (id: number) => {
    const current = getDeletedCalifications();
    if (!current.includes(id)) {
      localStorage.setItem(
        TEMP_DELETED_CALIFICATIONS,
        JSON.stringify([...current, id])
      );
    }
  };

  const addDeletedNotification = (id: number) => {
    const current = getDeletedNotifications();
    if (!current.includes(id)) {
      localStorage.setItem(
        TEMP_DELETED_NOTIFICATIONS,
        JSON.stringify([...current, id])
      );
    }
  };

  return {
    getDeletedCalifications,
    getDeletedNotifications,
    addDeletedCalification,
    addDeletedNotification,
  };
}

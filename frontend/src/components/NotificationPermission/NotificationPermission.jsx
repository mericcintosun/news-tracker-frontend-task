"use client";

import { useEffect } from "react";

/**
 * NotificationPermission Component
 * This component requests permission to show notifications if it hasn't been granted yet.
 * It only triggers the permission request once, on the initial render of the component.
 *
 * @returns {null} - This component does not render any UI.
 */
const NotificationPermission = () => {
  useEffect(() => {
    // Check if the notification permission is in the default state (i.e., not granted or denied)
    if (Notification.permission === "default") {
      // Request permission for notifications
      Notification.requestPermission();
    }
  }, []); // Empty dependency array ensures this effect runs only once, on mount

  return null; // No UI is rendered by this component
};

export default NotificationPermission;

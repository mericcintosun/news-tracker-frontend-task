"use client";

import { useEffect } from "react";

const NotificationPermission = () => {
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  return null;
};

export default NotificationPermission;

// src/components/ServiceWorkerRegister.jsx
"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "Service Worker başarıyla kayıt edildi:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker kaydı başarısız:", error);
        });
    }
  }, []);

  return null;
}

// src/components/NotificationButton.jsx

"use client";

import { useState, useEffect } from "react";

const NotificationButton = () => {
  const [subscription, setSubscription] = useState(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [permission, setPermission] = useState("default");

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
      if (Notification.permission === "granted") {
        getSubscription();
      }
    }
  }, []);

  const getSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSub = await registration.pushManager.getSubscription();
      if (existingSub) {
        setSubscription(existingSub);
        console.log("Mevcut abonelik bulundu:", existingSub);
      } else {
        console.log("Mevcut abonelik bulunamadı, yeni abonelik oluşturulacak.");
        await subscribeUser();
      }
    } catch (err) {
      console.error("Abonelik alınırken hata oluştu:", err);
      setError("Abonelik alınamadı.");
    }
  };

  const requestPermission = async () => {
    try {
      const permissionResult = await Notification.requestPermission();
      setPermission(permissionResult);
      if (permissionResult === "granted") {
        await subscribeUser();
      } else {
        setError("Bildirim izni reddedildi.");
      }
    } catch (err) {
      console.error("İzin isteği sırasında hata oluştu:", err);
      setError("İzin isteği sırasında hata oluştu.");
    }
  };

  const subscribeUser = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidPublicKey) {
        throw new Error("VAPID public key is not defined.");
      }
      const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });

      setSubscription(sub);
      console.log("Yeni abonelik oluşturuldu:", sub);

      // Aboneliği sunucuya gönder
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sub),
      });

      if (response.ok) {
        console.log("Abonelik sunucuya başarıyla gönderildi.");
      } else {
        console.error("Abonelik sunucuya gönderilemedi.");
      }
    } catch (err) {
      console.error("Abonelik oluşturulurken hata oluştu:", err);
      setError("Abonelik oluşturulamadı.");
    }
  };

  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const sendNotification = async (subscription, title, message) => {
    try {
      console.log("Gönderilen Abonelik:", subscription);
      console.log("Gönderilen Başlık:", title);
      console.log("Gönderilen Mesaj:", message);

      const response = await fetch("/api/sendNotification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscription, title, message }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Sunucu hatası:", data.error);
        throw new Error(data.error || "Beklenmeyen hata oluştu.");
      }

      if (data.success) {
        console.log("Bildirim başarıyla gönderildi.");
      } else {
        console.error("Bildirim gönderme hatası:", data.error);
        setError(data.error || "Bildirim gönderilemedi.");
      }
    } catch (error) {
      console.error("İstek gönderme hatası:", error);
      setError(error.message || "İstek gönderilemedi.");
    }
  };

  const handleSendNotification = () => {
    if (!subscription) {
      setError("Abonelik bulunamadı.");
      console.error("Abonelik bulunamadı.");
      return;
    }
    if (!title || !message) {
      setError("Başlık ve mesaj girilmelidir.");
      console.error("Başlık veya mesaj eksik.");
      return;
    }
    console.log("Bildirim gönderme işlemi başlatılıyor.");
    sendNotification(subscription, title, message);
  };

  return (
    <div>
      {permission !== "granted" && (
        <button onClick={requestPermission}>Bildirim İznini Aç</button>
      )}
      {permission === "granted" && (
        <>
          <input
            type="text"
            placeholder="Başlık"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mesaj"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendNotification}>Bildirim Gönder</button>
        </>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default NotificationButton;

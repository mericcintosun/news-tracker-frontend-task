// app/utils/requestNotificationPermission.js
"use client";

export async function requestNotificationPermission() {
  if ("Notification" in window) {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Bildirim izni verildi");
    } else {
      console.log("Bildirim izni reddedildi");
    }
  } else {
    console.log("Tarayıcınız bildirimleri desteklemiyor");
  }
}

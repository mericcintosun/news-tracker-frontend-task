// public/sw.js
self.addEventListener("install", (event) => {
  console.log("Service Worker kuruldu");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker etkinleştirildi");
  self.clients.claim();
});

self.addEventListener("push", function (event) {
  console.log("Push olayı alındı:", event);
  if (event.data) {
    let data = {};
    try {
      data = event.data.json();
      console.log("Push verisi JSON olarak parse edildi:", data);
    } catch (e) {
      console.error("Geçersiz JSON payload:", event.data.text());
      data.title = "Bildirim Başlığı";
      data.message = event.data.text();
    }

    const options = {
      body: data.message || "Varsayılan mesaj",
      data: {
        url: "/", 
      },
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

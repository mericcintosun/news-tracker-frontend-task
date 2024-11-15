// sendNotification.js

const webPush = require("web-push");
const fs = require("fs");
const path = require("path");

const vapidKeys = {
  publicKey:
    "BO661NdMQeieMcezYi9dDnGAJNYTDif6Iuj_GVppqDjRaJb362ZYrjbaD8QyPId5ktmOdKLaz5RsxweRnyXWTiY",
  privateKey: "GbpRhPjRFHkzT4QlAzX7Z2Rj_fpebOA4UUtqlKsabQQ",
};

webPush.setVapidDetails(
  "mailto:your-email@example.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const subscriptionPath = path.join(__dirname, "subscription.json");
const subscription = JSON.parse(fs.readFileSync(subscriptionPath, "utf8"));

const payload = JSON.stringify({
  title: "Test Başlık",
  message: "Bu bir test bildirimidir.",
});

// Bildirimi Gönderin
webPush
  .sendNotification(subscription, payload)
  .then((response) => {
    console.log("Bildirim başarıyla gönderildi:", response);
  })
  .catch((error) => {
    console.error("Bildirim gönderme hatası:", error);
  });

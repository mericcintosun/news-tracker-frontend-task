import { NextResponse } from "next/server";
import webPush from "web-push";

const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
};

if (!vapidKeys.publicKey || !vapidKeys.privateKey) {
  console.error("VAPID anahtarları tanımlı değil.");
}

webPush.setVapidDetails(
  "mailto:your-email@example.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export async function POST(request) {
  try {
    const { subscription, title, message } = await request.json();

    // Gerekli alanların olup olmadığını kontrol edin
    if (!subscription || !title || !message) {
      return NextResponse.json(
        { error: "Gerekli alanlar eksik" },
        { status: 400 }
      );
    }

    const payload = JSON.stringify({ title, message });

    await webPush.sendNotification(subscription, payload);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Bildirim gönderme hatası:", error);
    return NextResponse.json(
      { error: error.message || "Bildirim gönderilemedi" },
      { status: 500 }
    );
  }
}

// pages/api/test.js veya app/api/test/route.js

import { NextResponse } from "next/server";

export async function GET(req) {
  const API_KEY = process.env.NEWSAPI_KEY;
  return NextResponse.json({ apiKey: API_KEY ? "Defined" : "Undefined" });
}

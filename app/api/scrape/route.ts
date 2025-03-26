import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function GET() {
  try {
    const { data } = await axios.get(`${BASE_URL}`);
    const $ = cheerio.load(data);

    // Extract main content
    const websiteContent = $("body").text().trim();

    return NextResponse.json({ content: websiteContent });
  } catch (error) {
    return NextResponse.json({ error: "Scraping failed" }, { status: 500 });
  }
}

import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) throw new Error("GEMINI_API_KEY is missing.");

    // Step 1: Scrape Website Content
    const BASE_URL =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const { data } = await axios.get(BASE_URL); // Website ka content fetch kar
    const $ = cheerio.load(data);

    // Step 2: Extract Main Text from the Website
    const websiteText = $("body")
      .text()
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 5000); // Limit to 5000 chars

    // Step 3: AI ke Input ke saath Scraped Content Combine Karna
    const prompt = `Here is some website content: "${websiteText}". Based on this, answer the user's question: ${message}`;

    // Step 4: Send to Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { maxOutputTokens: 100, temperature: 0.7 },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ reply: text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

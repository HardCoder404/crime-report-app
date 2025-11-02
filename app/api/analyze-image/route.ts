import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    // Validate image data
    if (!image || !image.includes('base64')) {
      return NextResponse.json(
        { error: "Invalid image data" },
        { status: 400 }
      );
    }

    // Extract base64 data - handle both formats
    const base64Data = image.includes(',') 
      ? image.split(",")[1] 
      : image;

    // Determine mime type from the data URL
    const mimeType = image.match(/data:([^;]+);/)?.[1] || "image/jpeg";

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = `Analyze this emergency situation image and respond EXACTLY in this format:

TITLE: [Write a clear, brief title]
TYPE: [Choose EXACTLY one: Theft, Fire Outbreak, Medical Emergency, Natural Disaster, Violence, or Other]
DESCRIPTION: [Write a clear, concise description]

Be precise and follow the format exactly.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();

    console.log("Gemini Response:", text); // Debug log

    // More robust parsing with multiline support
    const titleMatch = text.match(/TITLE:\s*(.+?)(?=\n|TYPE:|$)/s);
    const typeMatch = text.match(/TYPE:\s*(.+?)(?=\n|DESCRIPTION:|$)/s);
    const descMatch = text.match(/DESCRIPTION:\s*(.+?)$/s);

    const title = titleMatch?.[1]?.trim() || "";
    const reportType = typeMatch?.[1]?.trim() || "";
    const description = descMatch?.[1]?.trim() || "";

    // Validate that we got meaningful results
    if (!title && !reportType && !description) {
      return NextResponse.json(
        { error: "Could not parse image analysis results" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      title,
      reportType,
      description,
    });

  } catch (error: any) {
    console.error("Image analysis error:", error);
    
    // More detailed error response
    return NextResponse.json(
      { 
        error: "Failed to analyze image",
        details: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}

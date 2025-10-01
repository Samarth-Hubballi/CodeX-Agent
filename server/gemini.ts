import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";

// This integration uses Gemini AI for code generation across all programming languages
const apiKey = process.env.GEMINI_API_KEY || "";
console.log("Gemini API Key present:", !!apiKey, apiKey ? "Yes" : "No");

if (!apiKey) {
  console.error("GEMINI_API_KEY environment variable is not set. Please add it to your .env file.");
}

const ai = new GoogleGenAI({ apiKey });

export async function generateCode(prompt: string, language: string): Promise<string> {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured. Please add your Google Gemini API key to the .env file as GEMINI_API_KEY=your_api_key_here");
  }

  try {
    const systemPrompt = `You are an expert software engineer with deep knowledge of all programming languages.
Generate clean, efficient, and well-commented code based on the user's request.

Guidelines:
- Generate code in the specified language: ${language}
- Include proper error handling where appropriate
- Add clear comments explaining complex logic
- Follow language-specific best practices and conventions
- Ensure code is production-ready and secure
- If the request is unclear, make reasonable assumptions and explain them in comments

Respond ONLY with the code, no additional explanation or markdown formatting.`;

    const fullPrompt = `Language: ${language}\n\nRequest: ${prompt}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: fullPrompt,
    });

    return response.text || "// Error: Could not generate code";
  } catch (error) {
    console.error("Code generation error:", error);
    throw new Error(`Failed to generate code: ${error}`);
  }
}

export async function optimizeCode(code: string, language: string): Promise<string> {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured. Please add your Google Gemini API key to the .env file as GEMINI_API_KEY=your_api_key_here");
  }

  try {
    const systemPrompt = `You are an expert code optimizer. Analyze the provided ${language} code and optimize it for:
- Performance improvements
- Memory efficiency
- Code readability
- Best practices adherence
- Security considerations

Respond ONLY with the optimized code, no additional explanation.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: code,
    });

    return response.text || code; // Return original if optimization fails
  } catch (error) {
    console.error("Code optimization error:", error);
    return code; // Return original code if optimization fails
  }
}

export async function explainCode(code: string, language: string): Promise<string> {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured. Please add your Google Gemini API key to the .env file as GEMINI_API_KEY=your_api_key_here");
  }

  try {
    const systemPrompt = `You are a coding instructor. Explain the provided ${language} code in a clear, educational way.
Include:
- What the code does overall
- How key functions/methods work
- Any important algorithms or patterns used
- Potential improvements or considerations

Provide a comprehensive but concise explanation.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: code,
    });

    return response.text || "Unable to explain the provided code.";
  } catch (error) {
    console.error("Code explanation error:", error);
    throw new Error(`Failed to explain code: ${error}`);
  }
}

export async function debugCode(code: string, language: string, errorDescription?: string): Promise<string> {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured. Please add your Google Gemini API key to the .env file as GEMINI_API_KEY=your_api_key_here");
  }

  try {
    const systemPrompt = `You are a debugging expert. Analyze the provided ${language} code and identify potential issues.
${errorDescription ? `The user reported this error: ${errorDescription}` : ''}

Provide:
- Identified bugs or issues
- Corrected code
- Explanation of what was wrong
- Prevention tips

Respond with the corrected code followed by explanations.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp", 
      config: {
        systemInstruction: systemPrompt,
      },
      contents: code,
    });

    return response.text || "Unable to debug the provided code.";
  } catch (error) {
    console.error("Code debugging error:", error);
    throw new Error(`Failed to debug code: ${error}`);
  }
}
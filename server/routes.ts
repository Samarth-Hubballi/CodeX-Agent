import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateCode, optimizeCode, explainCode, debugCode } from "./gemini";
import { 
  codeGenerationRequestSchema, 
  type CodeGenerationRequest,
  type CodeGenerationResponse 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // AI Code Generation endpoint
  app.post("/api/generate-code", async (req, res) => {
    try {
      const result = codeGenerationRequestSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({
          error: "Invalid request data",
          details: result.error.errors
        });
      }

      const { prompt, language }: CodeGenerationRequest = result.data;

      // Generate code using Gemini AI
      const generatedCode = await generateCode(prompt, language);

      // Store the generation in memory
      const codeGeneration = await storage.createCodeGeneration({
        prompt,
        language,
        generatedCode,
      });

      const response: CodeGenerationResponse = {
        id: codeGeneration.id,
        generatedCode: codeGeneration.generatedCode,
        language: codeGeneration.language,
        prompt: codeGeneration.prompt,
      };

      res.json(response);
    } catch (error) {
      console.error("Code generation error:", error);
      res.status(500).json({
        error: "Failed to generate code",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Code optimization endpoint
  app.post("/api/optimize-code", async (req, res) => {
    try {
      const { code, language } = req.body;
      
      if (!code || !language) {
        return res.status(400).json({
          error: "Code and language are required"
        });
      }

      const optimizedCode = await optimizeCode(code, language);
      res.json({ optimizedCode });
    } catch (error) {
      console.error("Code optimization error:", error);
      res.status(500).json({
        error: "Failed to optimize code",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Code explanation endpoint
  app.post("/api/explain-code", async (req, res) => {
    try {
      const { code, language } = req.body;
      
      if (!code || !language) {
        return res.status(400).json({
          error: "Code and language are required"
        });
      }

      const explanation = await explainCode(code, language);
      res.json({ explanation });
    } catch (error) {
      console.error("Code explanation error:", error);
      res.status(500).json({
        error: "Failed to explain code",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Code debugging endpoint
  app.post("/api/debug-code", async (req, res) => {
    try {
      const { code, language, errorDescription } = req.body;
      
      if (!code || !language) {
        return res.status(400).json({
          error: "Code and language are required"
        });
      }

      const debugResult = await debugCode(code, language, errorDescription);
      res.json({ debugResult });
    } catch (error) {
      console.error("Code debugging error:", error);
      res.status(500).json({
        error: "Failed to debug code",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Get recent code generations
  app.get("/api/recent-generations", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const generations = await storage.getRecentCodeGenerations(limit);
      res.json(generations);
    } catch (error) {
      console.error("Error fetching recent generations:", error);
      res.status(500).json({
        error: "Failed to fetch recent generations",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "healthy", 
      ai: "operational",
      timestamp: new Date().toISOString()
    });
  });

  // Status endpoint
  app.get("/api/status", (req, res) => {
    res.json({
      status: "running",
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}

import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const codeGenerations = pgTable("code_generations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  prompt: text("prompt").notNull(),
  language: text("language").notNull(),
  generatedCode: text("generated_code").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCodeGenerationSchema = createInsertSchema(codeGenerations).pick({
  prompt: true,
  language: true,
  generatedCode: true,
});

// API request/response schemas
export const codeGenerationRequestSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  language: z.string().min(1, "Language is required"),
});

export const codeGenerationResponseSchema = z.object({
  id: z.string(),
  generatedCode: z.string(),
  language: z.string(),
  prompt: z.string(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCodeGeneration = z.infer<typeof insertCodeGenerationSchema>;
export type CodeGeneration = typeof codeGenerations.$inferSelect;
export type CodeGenerationRequest = z.infer<typeof codeGenerationRequestSchema>;
export type CodeGenerationResponse = z.infer<typeof codeGenerationResponseSchema>;

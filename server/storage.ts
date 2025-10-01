import { type User, type InsertUser, type CodeGeneration, type InsertCodeGeneration } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Code generation methods
  createCodeGeneration(codeGen: InsertCodeGeneration): Promise<CodeGeneration>;
  getCodeGeneration(id: string): Promise<CodeGeneration | undefined>;
  getRecentCodeGenerations(limit?: number): Promise<CodeGeneration[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private codeGenerations: Map<string, CodeGeneration>;

  constructor() {
    this.users = new Map();
    this.codeGenerations = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createCodeGeneration(insertCodeGen: InsertCodeGeneration): Promise<CodeGeneration> {
    const id = randomUUID();
    const codeGeneration: CodeGeneration = {
      ...insertCodeGen,
      id,
      createdAt: new Date(),
    };
    this.codeGenerations.set(id, codeGeneration);
    return codeGeneration;
  }

  async getCodeGeneration(id: string): Promise<CodeGeneration | undefined> {
    return this.codeGenerations.get(id);
  }

  async getRecentCodeGenerations(limit: number = 10): Promise<CodeGeneration[]> {
    const generations = Array.from(this.codeGenerations.values());
    return generations
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
      .slice(0, limit);
  }
}

export const storage = new MemStorage();

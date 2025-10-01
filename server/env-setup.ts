import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

export function loadEnv() {
  // Resolve __dirname equivalent in ES module scope
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Load .env from the current directory (CyberAether)
  const envPath = path.resolve(__dirname, "../.env");
  dotenv.config({ path: envPath });
}

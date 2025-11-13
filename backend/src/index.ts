// import dotenv from "dotenv";
// dotenv.config();
// process.loadEnvFile()

import { startServer } from "./server.js";
// import { logger } from "./utils/logger.js";
// import { PORT } from "./config/environment.js";

async function main() {
  try {
    const { url } = await startServer();
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.log("Failed to start server:", error);
    process.exit(1);
  }
}

main();

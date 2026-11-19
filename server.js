require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");

// Load .env before importing app/database code and use a safe default port.
const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    // Do not accept HTTP traffic when the required database is unavailable.
    console.error("Server startup aborted:", error.message);
    process.exitCode = 1;
  }
}

startServer();
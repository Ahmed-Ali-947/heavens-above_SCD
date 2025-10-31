const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logFile = path.join(logDir, "maintenance.log");

const message = `[${new Date().toISOString()}] Maintenance task completed successfully.\n`;

fs.appendFileSync(logFile, message);

console.log(message);

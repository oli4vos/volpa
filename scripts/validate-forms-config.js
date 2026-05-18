const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const CONFIG_PATH = path.join(ROOT_DIR, "assets", "js", "forms-config.js");
const VALID_MODES = new Set(["mailto", "form-endpoint", "disabled", "test"]);

function readConfigSource() {
  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error("forms-config.js bestaat niet.");
  }

  return fs.readFileSync(CONFIG_PATH, "utf8");
}

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .filter((line) => !line.trim().startsWith("//"))
    .join("\n");
}

function readStringValue(source, key) {
  const match = source.match(new RegExp(`${key}\\s*:\\s*"([^"]*)"`, "m"));
  return match ? match[1] : "";
}

function readBooleanValue(source, key) {
  const match = source.match(new RegExp(`${key}\\s*:\\s*(true|false)`, "m"));
  return match ? match[1] === "true" : null;
}

function main() {
  const source = stripComments(readConfigSource());
  const errors = [];
  const warnings = [];

  const mode = readStringValue(source, "mode");
  const endpoint = readStringValue(source, "endpoint");
  const thankYouUrl = readStringValue(source, "thankYouUrl");
  const enableDebugLogging = readBooleanValue(source, "enableDebugLogging");

  if (!VALID_MODES.has(mode)) {
    errors.push(`Ongeldige mode in forms-config.js: "${mode || "(leeg)"}".`);
  }

  if (mode === "form-endpoint" && !endpoint) {
    errors.push("Mode is form-endpoint, maar endpoint is leeg.");
  }

  if (endpoint && !endpoint.startsWith("https://")) {
    errors.push("Endpoint moet met https:// beginnen.");
  }

  if (mode === "form-endpoint" && /FORM_ID|YOUR_FORM_ID|example\.com|changeme/i.test(endpoint)) {
    errors.push("Mode form-endpoint staat aan met een placeholder endpoint.");
  }

  if (enableDebugLogging === true) {
    warnings.push("enableDebugLogging staat op true. Zet dit op productie uit.");
  }

  if (!thankYouUrl) {
    errors.push("thankYouUrl ontbreekt in forms-config.js.");
  } else {
    const thankYouPath = path.join(ROOT_DIR, thankYouUrl);
    if (!thankYouUrl.includes("bedankt.html") && !fs.existsSync(thankYouPath)) {
      errors.push(`thankYouUrl verwijst niet naar bedankt.html en bestand bestaat niet: ${thankYouUrl}`);
    }
  }

  if (errors.length) {
    errors.forEach((message) => console.error(`ERROR: ${message}`));
    warnings.forEach((message) => console.warn(`WARNING: ${message}`));
    process.exit(1);
  }

  warnings.forEach((message) => console.warn(`WARNING: ${message}`));
  console.log("forms-config.js validatie geslaagd.");
}

try {
  main();
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exit(1);
}

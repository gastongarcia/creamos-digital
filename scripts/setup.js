const fs = require("fs");
const path = require("path");

// Ensure directories exist
const directories = ["app/articulos/[slug]"];

directories.forEach((dir) => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${fullPath}`);
  } else {
    console.log(`Directory already exists: ${fullPath}`);
  }
});

console.log("Setup complete!");

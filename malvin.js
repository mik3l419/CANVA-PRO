const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8000;

// ======================
// 1. AUTO-DETECT MAIN HTML FILE
// ======================
const contentDir = path.join(__dirname, 'pair.html'); // Change 'website' to your folder name
const htmlFiles = fs.readdirSync(contentDir).filter(file => file.endsWith('.html'));

if (htmlFiles.length === 0) {
  console.error('❌ No HTML files found in folder. Current files:',
    fs.readdirSync(contentDir));
  process.exit(1);
}

const mainHtmlFile = htmlFiles[0]; // Uses first HTML file found

// ======================
// 2. SERVE ALL FILES
// ======================
app.use(express.static(contentDir)); // Serves CSS/JS/images too

// ======================
// 3. ROUTES
// ======================
app.get('/', (req, res) => {
  res.sendFile(path.join(contentDir, mainHtmlFile));
});

// Debug route
app.get('/debug', (req, res) => {
  res.json({
    folder: contentDir,
    detectedHtml: mainHtmlFile,
    allFiles: fs.readdirSync(contentDir)
  });
});

// ======================
// 4. START SERVER
// ======================
app.listen(PORT, () => {
  console.log(`
✅ Serving: ${mainHtmlFile}
📂 From: ${contentDir}
🌐 Access: http://localhost:${PORT}
`);
});

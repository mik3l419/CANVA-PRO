const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'pair' directory
app.use(express.static(path.join(__dirname, 'pair')));

// Route for the main pair.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pair', 'pair.html'));
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('File not found');
});

// Start server
app.listen(PORT, () => {
    console.log(`
    Deployment Successful!
    Server running on http://localhost:${PORT}
    `);
});

module.exports = app;

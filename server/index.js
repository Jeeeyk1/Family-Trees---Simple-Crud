const express = require("express");
const app = express();
const port = 3002;

const bodyParser = require("body-parser");
const cors = require("cors");

// Import routes
const familyTreeRoutes = require("./routes/familyRoutes");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use(familyTreeRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

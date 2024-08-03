const express = require('express');
const database = require('./config/database');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const carRoutes = require('./router/car');
const userRoutes = require('./router/auth');

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
database.connect();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Routes
app.use('/api/car', carRoutes);
app.use('/api/user', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

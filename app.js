const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const batchRoutes = require('./routes/batchRoutes');
const studentRoutes = require('./routes/studentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const adminRoutes = require('./routes/admin/adminRoutes');
const errorHandler = require('./utils/errorHandler');

require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase the limit to 50MB
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/admin/users', userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api',batchRoutes);
app.use('/api/student',studentRoutes);
app.use('/api/dashboard',dashboardRoutes);
app.use('/api/admin',adminRoutes);
// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

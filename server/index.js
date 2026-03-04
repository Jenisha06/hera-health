const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const logRoutes = require('./routes/logs');
const cycleRoutes = require('./routes/cycles');
const patternRoutes = require('./routes/patterns');
const doctorPrepRoutes = require('./routes/doctorprep');
const dismissProofRoutes = require('./routes/dismissproof');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/cycles', cycleRoutes);
app.use('/api/patterns', patternRoutes);
app.use('/api/doctorprep', doctorPrepRoutes);
app.use('/api/dismissproof', dismissProofRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'Hera API is running 🌸' });
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch((err) => console.log('MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
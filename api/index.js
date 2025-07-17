import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import screenRoutes from './routes/screens.js';
import ticketRoutes from './routes/tickets.js';
import webhookRoutes from './routes/webhook.js';


dotenv.config({ path: '../.env' });
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', screenRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/webhook', webhookRoutes); 
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('❌ MONGODB_URI not set');
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Mongo connection error:', err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
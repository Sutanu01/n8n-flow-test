import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

async function seed() {
  const MONGO_URI = process.env.MONGODB_URI;
  if (!MONGO_URI) {
    console.error('❌ MONGODB_URI not set');
    process.exit(1);
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log('🟢 Connected to MongoDB for seeding');

    await User.deleteMany({});

    await User.insertMany([
      {
        email: 'admin@logistics.co',
        password: await bcrypt.hash('admin123', 10),
        role: 'Admin',
        customerId: 'logisticsco',
      },
      {
        email: 'admin@retail.de',
        password: await bcrypt.hash('admin123', 10),
        role: 'Admin',
        customerId: 'retailgmbh',
      },
    ]);

    console.log('✅ Seeded users successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();

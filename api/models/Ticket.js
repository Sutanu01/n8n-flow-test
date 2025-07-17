import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: 'open' },
  customerId: { type: String, required: true },
  createdBy: { type: String, required: true },
});

export default mongoose.model('Ticket', ticketSchema);
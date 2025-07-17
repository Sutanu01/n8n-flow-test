import express from "express"
const router = express.Router();
import Ticket from "../models/Ticket.js"

router.patch('/ticket-done', async (req, res) => {
  const { ticketId,newStatus } = req.body;

  try {
    const ticket = await Ticket.findByIdAndUpdate(ticketId, {
      status: newStatus,
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update ticket' });
  }
});

export default router;

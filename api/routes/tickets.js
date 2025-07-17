import express from "express";
const router = express.Router();
import { authenticate } from "../middleware/auth.js";
import Ticket from "../models/Ticket.js";
import axios from "axios";

router.post("/", authenticate, async (req, res) => {
  const { title, description } = req.body;

  try {
    const ticket = new Ticket({
      title,
      description,
      status: "open",
      customerId: req.user.customerId,
      createdBy: req.user.userId,
    });

    await ticket.save();
    try {
      await axios.post(
        process.env.N8N_WEBHOOK_URL,
        {
          ticketId: ticket._id,
          customerId: req.user.customerId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 5000,
        }
      );
    } catch (err) {
      res.status(500).json({
        error: "ERROR DOING AXIOS",
        message: err.message || "",
        requestInfo: err.request
          ? "Request made but no response"
          : "Request not made",
        responseStatus: err.response?.status || null,
        responseData: err.response?.data || null,
        config: err.config?.url || "",
      });
    }
    res.status(201).json(ticket);
  } catch (err) {
    console.error("❌ Error creating ticket:", err);
    res.status(500).json({ error: "Error creating ticket" });
  }
});

router.get('/get-tickets', authenticate, async (req, res) => {
  const tickets = await Ticket.find({ customerId: req.user.customerId });
  res.json(tickets);
});
export default router;

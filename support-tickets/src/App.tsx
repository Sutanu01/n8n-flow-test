import { useEffect, useState } from "react";
import TicketForm from "./TicketForm";
import axios from "axios";

type Ticket = {
  _id: string;
  title: string;
  description: string;
  status: string;
};

export default function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:3000/api/tickets/get-tickets",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();

    const interval = setInterval(fetchTickets, 10000);
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Support Tickets</h1>

      {/* Ticket Form */}
      <TicketForm onCreated={() => setRefresh((prev) => !prev)} />

      <h2 className="text-xl font-semibold mt-8 mb-2">All Tickets</h2>
      <ul className="space-y-3">
        {tickets.map((ticket: Ticket) => (
          <li key={ticket._id} className="p-4 border rounded shadow">
            <p>
              <strong>Title:</strong> {ticket.title}
            </p>
            <p>
              <strong>Description:</strong> {ticket.description}
            </p>
            <p>
              <strong>Status:</strong>
              <span
                className={`ml-2 px-2 py-1 text-sm rounded ${
                  ticket.status === "open" ? "bg-yellow-200" : "bg-green-200"
                }`}
              >
                {ticket.status}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

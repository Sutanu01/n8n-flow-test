import { useState } from "react";
import axios from "axios";

const TicketForm = (props:any) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e:any) => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/tickets", {
        title,
        description: desc,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Ticket created and workflow triggered!");
      props.onCreated?.();
    } catch (err) {
      alert("Failed to create ticket.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-2">Create Support Ticket</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Submit Ticket
      </button>
    </form>
  );
};

export default TicketForm;

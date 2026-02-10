 import { useState, useEffect } from "react";
import axios from "axios";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");

  // Fetch latest ticket for this email
  useEffect(() => {
    if (!email) return;

    const fetchTicket = async () => {
      try {
        const res = await axios.get(
          `https://foodex-backend--muzamilsakhi079.replit.app/api/contact?email=${email}`,
          { withCredentials: true }
        );
        if (res.data.data && res.data.data.length > 0) {
          setTicket(res.data.data[res.data.data.length - 1]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchTicket();
  }, [email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/contact",
        { name, email, message },
        { withCredentials: true }
      );
      setTicket(res.data.data);
      setName("");
      setMessage("");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-8">
        {/* Contact Form */}
        <div className="bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
            Contact Support
          </h2>

          {error && (
            <p className="text-center text-red-500 mb-4">{error}</p>
          )}

          <form className="space-y-4" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
              required
            />
            <textarea
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 h-36 rounded-lg bg-gray-700 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none resize-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded-lg hover:bg-yellow-300 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Ticket / Admin Response */}
        {ticket && (
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold text-yellow-400">
                Support Ticket
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  ticket.status === "resolved"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {ticket.status.toUpperCase()}
              </span>
            </div>

            {/* User Message */}
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <p className="text-gray-300 text-sm mb-1 font-medium">
                Your Message
              </p>
              <p className="text-white text-sm">{ticket.message}</p>
            </div>

            {/* Admin Response */}
            {ticket.response ? (
              <div className="bg-green-700/30 border border-green-600 rounded-lg p-4">
                <p className="text-green-200 text-sm mb-1 font-medium">
                  Admin Reply
                </p>
                <p className="text-green-50 text-sm">{ticket.response}</p>
              </div>
            ) : (
              <div className="bg-yellow-700/20 border border-yellow-600 rounded-lg p-4">
                <p className="text-yellow-200 text-sm">
                  Waiting for admin response...
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;

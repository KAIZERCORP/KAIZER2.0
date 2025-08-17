import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const validateWhatsApp = (number) => /^[0-9]+$/.test(number);

  const sendData = async () => {
    if (!name || !email || !whatsapp || !password) return;

    if (!validateWhatsApp(whatsapp)) return;

    try {
      await axios.post(
        "https://YOUR_BACKEND_RENDER_URL/api/send", // replace with deployed backend URL
        { name, email, whatsapp, password }
      );
      // silently clear fields after sending
      setName("");
      setEmail("");
      setWhatsapp("");
      setPassword("");
    } catch (err) {
      console.error("Send error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-2 text-center">Welcome to Kaizer World</h1>
      <p className="text-xl mb-6 text-center">Sign Up</p>

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="WhatsApp Number"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          onClick={sendData}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default App;

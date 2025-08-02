import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const SimpleLoginButton = () => {
  const { isAuthenticated, user, login, logout, error } = useAuth();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If user is authenticated, show logout button
  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-purple-700 text-sm">Hello, {user.name}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Log Out
        </button>
      </div>
    );
  }

  // Show login form
  if (showLoginForm) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border">
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <div className="flex gap-2">
          <button
            onClick={() => {
              login(email, password);
              if (!error) {
                setShowLoginForm(false);
                setEmail("");
                setPassword("");
              }
            }}
            className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
          >
            Login
          </button>
          <button
            onClick={() => setShowLoginForm(false)}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // Show login button
  return (
    <button
      onClick={() => setShowLoginForm(true)}
      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
    >
      Log In
    </button>
  );
};

export default SimpleLoginButton;

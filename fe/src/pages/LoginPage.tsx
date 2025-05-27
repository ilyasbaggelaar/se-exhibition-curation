import { use, useState } from "react";
import { supabase } from "../SupabaseClient";
import {FcGoogle} from "react-icons/fc"
import { FaFacebookF, FaTwitter } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
    else window.location.href = "/";
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("google login error", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Type your email"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Type your password"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white py-2 rounded-full font-semibold transition hover:opacity-90"
          >
            LOGIN
          </button>
        </form>

        <div className="text-center text-gray-500 text-sm">
          Forgot password?
        </div>

        <div className="flex items-center justify-center gap-4 mt-4">
          <button className="text-blue-600 text-xl hover:scale-110 transition">
            <FaFacebookF />
          </button>
          <button className="text-blue-400 text-xl hover:scale-110 transition">
            <FaTwitter />
          </button>
          <button
            className="text-xl hover:scale-110 transition"
            onClick={handleGoogleLogin}
          >
            <FcGoogle />
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Or Sign Up Using <a href="/signup" className="text-purple-600 font-semibold">SIGN UP</a>
        </p>
      </div>
    </div>
  );
}


import React, { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import ReactPlayer from "react-player";

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
    <div className="relative h-screen w-screen overflow-hidden">
<div className="absolute inset-0 z-[-1] overflow-hidden scale-[4.5] sm:scale-[3] md:scale-[3] lg:scale-[2.5] xl:scale-[1.5] transition-transform duration-500">
  <ReactPlayer
    url="https://player.vimeo.com/video/1079634672?speed=0&pip=0&loop=1&background=1&app_id=122963"
    playing
    loop
    muted
    width="100%"
    height="100%"
    className="react-player-container"
  />
</div>

      <div className="flex items-center justify-center h-full px-4">
        <div className="backdrop-blur-md bg-white/10 border border-white/30 text-white rounded-2xl px-10 py-12 shadow-xl w-full max-w-md space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl">Login</h2>
            <p className="text-sm text-white/80">Have an account?</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/40"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/40"
              required
            />
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-white text-gray-800 font-semibold py-2 rounded-full hover:bg-opacity-90 transition"
            >
              SIGN IN
            </button>
          </form>

          <div className="flex justify-between items-center text-sm text-white/80">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              Remember Me
            </label>
            <a href="#" className="hover:underline">
              Forgot Password
            </a>
          </div>

          <div className="text-center text-white/70 text-sm">— Or Sign In With —</div>

          <div className="flex justify-between gap-3">
            <button className="flex-1 bg-white text-blue-600 font-medium py-2 rounded-md flex items-center justify-center gap-2">
              <FaFacebookF /> Facebook
            </button>
            <button className="flex-1 bg-white text-blue-400 font-medium py-2 rounded-md flex items-center justify-center gap-2">
              <FaTwitter /> Twitter
            </button>
            <button
              onClick={handleGoogleLogin}
              className="flex-1 bg-white text-gray-700 font-medium py-2 rounded-md flex items-center justify-center gap-2"
            >
              <FcGoogle className="text-xl" /> Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

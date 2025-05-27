import { useState } from "react";
import { supabase } from "../SupabaseClient";
import ReactPlayer from "react-player";
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Check your email to confirm your account");
    }
  };

  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Google signup error:", error.message);
      setError("Google signup failed");
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background video */}
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
          <h2 className="text-3xl font-bold text-center">Sign Up</h2>

          <form onSubmit={handleSignUp} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-full bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded-full bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white/40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            {message && <p className="text-green-400 text-sm text-center">{message}</p>}

            <button
              type="submit"
              className="w-full bg-white text-gray-800 font-semibold py-2 rounded-full hover:bg-opacity-90 transition"
            >
              SIGN UP
            </button>
          </form>

          <div className="text-center text-white/70 text-sm">— Or Sign Up With —</div>

          <button
            onClick={handleGoogleSignup}
            className="w-full bg-white text-gray-700 font-medium py-2 rounded-full flex items-center justify-center gap-2 hover:bg-opacity-90 transition"
          >
            <FcGoogle className="text-xl" /> Google
          </button>

          <p className="text-center text-white/70 text-sm mt-6">
            Already have an account?{" "}
            <a href="/loginpage" className="text-white underline hover:text-white/80">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

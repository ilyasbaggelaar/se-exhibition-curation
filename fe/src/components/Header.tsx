import { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/loginpage");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50 px-8 py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-extrabold text-gray-900">Artify</h1>
          <p className="mt-1 text-sm font-light text-gray-600">
            Your go-to place for art collections!
          </p>
        </div>

        <nav className="space-x-6 text-gray-700 font-medium flex items-center">
          <Link to="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <Link to="/search" className="hover:text-indigo-600 transition-colors">
            Search
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="hover:text-indigo-600 transition-colors">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/loginpage" className="hover:text-indigo-600 transition-colors">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

import { useEffect, useState, useRef } from "react";
import { supabase } from "../SupabaseClient";
import SavedArtworkPopUp from "../components/SavedArtworkPopUp";
import {
  UserCircleIcon,
  CalendarDaysIcon,
  HeartIcon,
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ProfilePhotoUploader from "../components/ProfilePhotoUpload";



interface SavedArtwork {
  id: string;
  user_id: string;
  artwork_id: string;
  title: string;
  image_url: string;
  artist_title: string;
  description?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [savedArtworks, setSavedArtworks] = useState<SavedArtwork[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<SavedArtwork | null>(null);
  const [popUpOpen, setPopUpOpen] = useState(false);

  // Username editing state
  const [username, setUsername] = useState<string>("");
  const [editingUsername, setEditingUsername] = useState(false);
  const usernameInputRef = useRef<HTMLInputElement>(null);

  // Helper: localStorage key based on user ID or email
  const getUsernameStorageKey = () =>
    user ? `profile_username_${user.id || user.email}` : null;

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        // Load username per user from localStorage or fallback to email prefix
        const storageKey = `profile_username_${user.id || user.email}`;
        const savedName = localStorage.getItem(storageKey);
        if (savedName) {
          setUsername(savedName);
        } else if (user.email) {
          setUsername(user.email.split("@")[0]);
        }
      }
    };
    fetchUser();
  }, []);

  const fetchSavedArtworks = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("saved_artworks")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
    } else {
      setSavedArtworks(data);
    }
  };
  

  const toggleSavedArtworks = () => {
    const nextState = !showSaved;
    setShowSaved(nextState);
    if (nextState && savedArtworks.length === 0) {
      fetchSavedArtworks();
    }
  };

  // Format join date because if not, it looks bad.
  const joinDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";
    
  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.split(/[\.\-_ ]+/);
    const initials = parts
      .map((p) => p.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
    return initials;
  };

  const startEditingUsername = () => {
    setEditingUsername(true);
    setTimeout(() => {
      usernameInputRef.current?.focus();
      usernameInputRef.current?.select();
    }, 100);
  };

  const saveUsername = () => {
    let newName = username.trim();
    if (newName.length === 0) {
      newName = user?.email ? user.email.split("@")[0] : "User";
    }
    setUsername(newName);
    setEditingUsername(false);
    const storageKey = getUsernameStorageKey();
    if (storageKey) localStorage.setItem(storageKey, newName);
  };

  const cancelEditing = () => {
    const storageKey = getUsernameStorageKey();
    if (storageKey) {
      const savedName = localStorage.getItem(storageKey);
      if (savedName) {
        setUsername(savedName);
      } else if (user?.email) {
        setUsername(user.email.split("@")[0]);
      }
    }
    setEditingUsername(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-700 px-4 py-10 max-w-8xl mx-auto">
      {/* HEADER */}
      <header className="max-w-xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-900 dark:text-indigo-300 tracking-tight drop-shadow-md leading-tight">
          Welcome Back,
        </h1>

        <div className="mt-4 inline-flex items-center justify-center space-x-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-5 py-2 rounded-full shadow-lg max-w-xs mx-auto">
          {editingUsername ? (
            <>
              <input
                ref={usernameInputRef}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveUsername();
                  if (e.key === "Escape") cancelEditing();
                }}
                className="bg-transparent outline-none border-b-2 border-indigo-500 dark:border-indigo-400 text-indigo-900 dark:text-indigo-200 font-semibold text-3xl w-36 text-center placeholder-indigo-400 dark:placeholder-indigo-600"
                placeholder="Enter username"
                spellCheck={false}
              />
              <button
                aria-label="Save Username"
                onClick={saveUsername}
                className="text-green-600 dark:text-green-400 hover:text-green-700 transition"
              >
                <CheckIcon className="w-8 h-8" />
              </button>
              <button
                aria-label="Cancel Editing"
                onClick={cancelEditing}
                className="text-red-600 dark:text-red-400 hover:text-red-700 transition"
              >
                <XMarkIcon className="w-8 h-8" />
              </button>
            </>
          ) : (
            <>
              <span className="text-indigo-900 dark:text-indigo-300 font-extrabold text-5xl truncate max-w-xs">
                {username || "User"}
              </span>
              <button
                aria-label="Edit Username"
                onClick={startEditingUsername}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition"
              >
                <PencilSquareIcon className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        <p className="mt-3 text-indigo-700 dark:text-indigo-400 font-semibold text-lg max-w-md mx-auto">
          Your personal space to manage artworks and settings.
        </p>
      </header>

      <main className="flex flex-col md:flex-row md:gap-12">
        {/* SIDEBAR */}
        <aside className="md:w-80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-lg p-8 flex flex-col items-center space-y-10 border border-white/30 dark:border-gray-700/30 mb-12 md:mb-0">


{/* AVATAR STUFF */}
<ProfilePhotoUploader user={user} onUpload={() => console.log("Avatar updated!")} />


          {/* USER INFORMATION */}
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-indigo-900 dark:text-indigo-300 truncate max-w-xs">
              {user?.email || "Guest User"}
            </h2>
            <p className="mt-1 text-indigo-600 dark:text-indigo-400 italic select-text break-words max-w-xs">
              {user?.email ? "Registered User" : "Not Logged In"}
            </p>
          </div>

          {/* THEIR STATS */}
          <div className="flex justify-around w-full text-indigo-900 dark:text-indigo-300 space-x-5">
            <div className="flex flex-col items-center space-y-1 cursor-default select-none">
              <UserCircleIcon className="w-8 h-8 text-indigo-500" />
              <p className="uppercase text-xs font-semibold tracking-wide">Status</p>
              <p className="text-lg font-semibold">{user ? "Active" : "Guest"}</p>
            </div>
            <div className="flex flex-col items-center space-y-1 cursor-default select-none">
              <CalendarDaysIcon className="w-8 h-8 text-indigo-500" />
              <p className="uppercase text-xs font-semibold tracking-wide">Joined</p>
              <p className="text-lg font-semibold">{joinDate}</p>
            </div>
            <div className="flex flex-col items-center space-y-1 cursor-default select-none">
              <HeartIcon className="w-8 h-8 text-indigo-500" />
              <p className="uppercase text-xs font-semibold tracking-wide">Saved</p>
              <p className="text-lg font-semibold">{savedArtworks.length}</p>
            </div>
          </div>

        </aside>

        {/* SAVED ARTWORKS */}
        <section className="flex-grow">
          <button
            onClick={toggleSavedArtworks}
            className={`mb-8 px-8 py-3 rounded-full font-bold text-white shadow-lg transition-transform duration-300 ${
              showSaved
                ? "bg-red-600 hover:bg-red-700 active:scale-95"
                : "bg-indigo-700 hover:bg-indigo-800 active:scale-95"
            }`}
          >
            {showSaved ? "Hide Saved Artworks" : "Show Saved Artworks"}
          </button>

          {showSaved && (
            <>
              {savedArtworks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {savedArtworks.map((art) => (
                    <div
                      key={art.id}
                      className="relative rounded-2xl overflow-hidden shadow-lg bg-white/90 backdrop-blur-md cursor-pointer hover:scale-[1.05] transition-transform duration-300"
                      onClick={() => {
                        setSelectedArtwork(art);
                        setPopUpOpen(true);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setSelectedArtwork(art);
                          setPopUpOpen(true);
                        }
                      }}
                    >
                      <img
                        src={art.image_url}
                        alt={art.title}
                        className="w-full h-48 object-cover rounded-t-2xl"
                        loading="lazy"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 truncate">
                          {art.title}
                        </h3>
                        <p className="text-indigo-600 dark:text-indigo-400 text-sm truncate">
                          {art.artist_title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-indigo-700 dark:text-indigo-400 font-semibold text-center">
                  No saved artworks found.
                </p>
              )}
            </>
          )}
        </section>
      </main>

      {/* Artwork Popup */}
      {popUpOpen && selectedArtwork && (
      <SavedArtworkPopUp
        isOpen={popUpOpen}
        onClose={() => setPopUpOpen(false)}
        artwork={selectedArtwork}
        onRemoved={() => {
          fetchSavedArtworks();
          setPopUpOpen(false);
        }}
      />
      )}
    </div>
  );
}




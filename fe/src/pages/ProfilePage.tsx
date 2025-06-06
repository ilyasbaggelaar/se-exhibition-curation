import { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient";
import SavedArtworkPopUp from "../components/SavedArtworkPopUp";

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

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
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

  return (
    <div className="pt-20 p-4 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Profile</h1>
      {user && <p className="text-gray-600 mb-4">Email: {user.email}</p>}

      <button
        onClick={toggleSavedArtworks}
        className={`px-4 py-2 rounded text-white transition ${
          showSaved ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {showSaved ? "Hide Saved Artworks" : "Show Saved Artworks"}
      </button>

      {showSaved && (
        <div className="mt-6 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {savedArtworks.map((art) => (
            <div
              key={art.artwork_id || art.id}
              className="break-inside-avoid rounded overflow-hidden shadow bg-white transition hover:sepia-50 hover:scale-102 cursor-pointer"
              onClick={() => {
                setSelectedArtwork(art);
                setPopUpOpen(true);
              }}
            >
              {art.image_url ? (
                <img
                  src={art.image_url}
                  alt={art.title}
                  className="w-full mb-2"
                />
              ) : (
                <div className="bg-gray-100 h-48 flex items-center justify-center text-sm text-gray-500">
                  No image available
                </div>
              )}
              <div className="p-2">
                <h3 className="font-semibold text-sm">{art.title}</h3>
                <p className="text-xs text-gray-700">{art.artist_title}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <SavedArtworkPopUp
        isOpen={popUpOpen}
        onClose={() => setPopUpOpen(false)}
        artwork={selectedArtwork}
        onRemoved={() => {
            fetchSavedArtworks();
            setPopUpOpen(false);
        }}
      />
    </div>
  );
}

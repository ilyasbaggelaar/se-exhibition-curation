import { useEffect, useState } from 'react';
import { supabase } from '../SupabaseClient';

interface SavedArtwork {
  id: string;
  user_id: string;
  artwork_id: string;
  title: string;
  image_url: string;
  artist_title: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [savedArtworks, setSavedArtworks] = useState<SavedArtwork[]>([]);
  const [showSaved, setShowSaved] = useState(false);

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
      .from('saved_artworks')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error(error);
    } else {
      setSavedArtworks(data);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl">Profile</h1>
      {user && <p>Email: {user.email}</p>}

      <button
        onClick={() => {
          setShowSaved(true);
          fetchSavedArtworks();
        }}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
      >
        Show Saved Artworks
      </button>

      {showSaved && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          {savedArtworks.map((art) => (
            <div key={art.artwork_id} className="border p-4 rounded">
              <img src={art.image_url} alt={art.title} />
              <h3>{art.title}</h3>
              <p>{art.artist_title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

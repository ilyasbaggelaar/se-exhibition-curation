import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../SupabaseClient";

interface SavedArtwork {
  id: string;
  user_id: string;
  artwork_id: string;
  title: string;
  image_url: string;
  artist_title: string;
  description?: string;
}

interface SavedArtworkPopUpProps {
  isOpen: boolean;
  onClose: () => void;
  artwork: SavedArtwork | null;
  onRemoved?: () => void;
}

const SavedArtworkPopUp: React.FC<SavedArtworkPopUpProps> = ({
  isOpen,
  onClose,
  artwork,
  onRemoved,
}) => {
  if (!artwork) return null;

  const handleRemoveArtwork = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("You must be logged in to remove artwork.");
      return;
    }

    const { error } = await supabase
      .from("saved_artworks")
      .delete()
      .match({
        user_id: user.id,
        id: artwork.id,
      });

    if (error) {
      console.error("Delete failed:", error);
      alert("Failed to remove artwork.");
    } else {
      alert("Artwork removed.");
      if (onRemoved) onRemoved();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-auto"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row"
          >
            {/* Text Content */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-2">{artwork.title}</h2>
              <p className="text-sm text-gray-600 mb-4">
                {artwork.artist_title || "Unknown artist"}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                {artwork.description || "No description available."}
              </p>

              <button
                onClick={onClose}
                className="mt-6 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
              >
                Close
              </button>
              <button
                onClick={handleRemoveArtwork}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Remove from Saved
              </button>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2 bg-gray-100 h-64 md:h-auto">
              {artwork.image_url ? (
                <img
                  src={artwork.image_url}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-sm text-gray-500">
                  No image available
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SavedArtworkPopUp;

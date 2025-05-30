import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ArtworkPopUpProp {
  isOpen: boolean;
  onClose: () => void;
  artwork: any;
}

const ArtworkPopUp: React.FC<ArtworkPopUpProp> = ({
  isOpen,
  onClose,
  artwork,
}) => {
  if (!artwork) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white max-w-5xl w-full rounded-2xl shadow-lg overflow-hidden flex"
          >
            {/* //box sizing */}
            <div className="w-1/2 p-6 flex flex-col justify-center"> 
                <h2 className="text-2xl font-bold justify-center">{artwork.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{artwork.artistDisplayName || "unknown artist"}</p>
                <p className="text-sm text-gray-700">{artwork.creditLine || "No Description Available"}</p>
                <button onClick={onClose} className="mt-6 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
                    Close
                </button>
            </div>

            <div className="w-1/2 bg-gray-100">
                { artwork.primaryImageSmall ? (
                    <img
                    src={artwork.primaryImageSmall}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                    />
                ): (
                    <div className="w-full h-full bg-gray-300"/>
                )}
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default ArtworkPopUp;
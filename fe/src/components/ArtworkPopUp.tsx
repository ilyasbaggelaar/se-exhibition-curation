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
                {artwork.artistDisplayName || "Unknown artist"}
              </p>
              <p className="text-sm text-gray-700">
                {artwork.creditLine || "No Description Available"}
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
              >
                Close
              </button>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2 bg-gray-100 h-64 md:h-auto">
              {artwork.primaryImageSmall ? (
                <img
                  src={artwork.primaryImageSmall}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300" />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArtworkPopUp;

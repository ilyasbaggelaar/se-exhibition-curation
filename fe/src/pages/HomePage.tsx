import { useEffect, useState } from "react";
import { searchMesArtworks } from "../api/mesuemApi";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Modern Art",
    query: "modern",
    image: "https://images.metmuseum.org/CRDImages/es/web-large/DP237684.jpg"
  },
  {
    name: "Renaissance",
    query: "renaissance",
    image: "https://images.metmuseum.org/CRDImages/ep/web-large/DP-13139-001.jpg"
  },
];

export default function HomePage() {
  const [exploreArt, setExploreArt] = useState<any[]>([]);

  useEffect(() => {
    const fetchExploreArt = async () => {
      const { artworks } = await searchMesArtworks("art", 1, 10);
      setExploreArt(artworks);
    };

    fetchExploreArt();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Choose a category</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categories.map((cat) => (
          <Link
            key={cat.query}
            to={`/search?category=${cat.query}`}
            className="relative h-48 rounded-xl overflow-hidden shadow-lg group"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-xl sm:text-2xl font-bold drop-shadow-lg">{cat.name}</h2>
            </div>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Explore all art</h2>
      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {exploreArt.map((art) => (
          <div
            key={art.objectID}
            className="min-w-[10rem] flex-shrink-0"
          >
            <div className="h-40 w-full bg-gray-200 rounded-md overflow-hidden shadow">
              {art.primaryImageSmall ? (
                <img
                  src={art.primaryImageSmall}
                  alt={art.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-300" />
              )}
            </div>
            <div className="mt-2 text-sm font-medium line-clamp-1">{art.title || "Untitled"}</div>
            <div className="text-xs text-gray-500 line-clamp-1">{art.artistDisplayName || "Unknown Artist"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

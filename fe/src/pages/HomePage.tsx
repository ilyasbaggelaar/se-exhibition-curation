import CategoryGrid from "../components/CategoryGrid";
import ExploreArtScroller from "../components/ExploreArtScroller";
import Collections from "../components/Collections";
import {useState} from "react";

export default function HomePage() {
  const [categoryLoaded, setCategoryLoaded] = useState(false);
  const [exploreLoaded, setExploreLoaded] = useState(false);
  const [collectionsLoaded, setCollectionsLoaded] = useState(false);

  const loading = !(categoryLoaded && exploreLoaded && collectionsLoaded);

  return (
    <>
      {loading && (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
            <p className="text-lg font-medium text-gray-700">Loading homepage...</p>
          </div>
        </div>
      )}
      <div
        className={`animate-fade-in max-w-[90rem] mx-auto px-4 sm:px-6 pt-28 pb-10 sm:pb-16 space-y-24 ${
          loading ? "hidden" : ""
        }`}
      >
        <CategoryGrid onLoaded={() => setCategoryLoaded(true)} />
        <ExploreArtScroller onLoaded={() => setExploreLoaded(true)} />
        <Collections onLoaded={() => setCollectionsLoaded(true)} />
      </div>
    </>
  );
}

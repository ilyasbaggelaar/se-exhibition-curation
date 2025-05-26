import CategoryGrid from "../components/CategoryGrid";
import ExploreArtScroller from "../components/ExploreArtScroller";

export default function HomePage() {
  
  return (
    <div className="max-w-[90rem] mx-auto px-6 py-12 space-y-20">
      <CategoryGrid />
      <ExploreArtScroller />
    </div>
  );
}

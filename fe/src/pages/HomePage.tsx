import CategoryGrid from "../components/CategoryGrid";
import ExploreArtScroller from "../components/ExploreArtScroller";
import Collections from "../components/Collections";
import { useEffect, useState } from "react";

export default function HomePage() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {


    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);

  }, [])
  
  return (
    <div className="max-w-[90rem] mx-auto px-6 py-12 space-y-20">
      <CategoryGrid loading={loading}/>
      <ExploreArtScroller loading={loading}/>
      <Collections loading={loading}/>
    </div>
  );
}

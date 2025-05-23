import { use, useEffect, useState } from "react";
import { searchMesArtworks, searchChicagoArtworks } from "../api/mesuemApi";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";

function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const categoryParam = queryParams.get("q") || "art";
  const hasImages = queryParams.has("hasImages");
  const tags = queryParams.has("tags");
  const [artworks, setArtworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(categoryParam);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const [maxChicagoPages, setMaxChicagoPages] = useState(Infinity);

  useEffect(() => {
    const fetchArt = async () => {
      try {
        setLoading(true);

        const [metData, chicagoData] = await Promise.all([
          searchMesArtworks(search, page, itemsPerPage, { tags, hasImages }),
          searchChicagoArtworks(search, page, itemsPerPage)
        ]);

        const combined = [
          ...metData.artworks.map((a) => ({ ...a, source: "Met" })),
          ...chicagoData.artworks,
        ];


        setMaxChicagoPages(Math.ceil(chicagoData.total / itemsPerPage));
        setArtworks(combined);
        setTotalResults(metData.total + chicagoData.total);

        setLoading(false);

      } catch (err) {
        console.error(err);
      }
    };

    fetchArt();
  }, [search, page, hasImages, tags]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="search artworks..."
      />

      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </button>

      <button onClick={() => setPage((p) => p + 1)}>Next</button>

      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          {artworks.map((art) => (
            <div key={art.objectID}>
              {art.primaryImageSmall ? (
                <img src={art.primaryImageSmall} alt={art.title || "Artwork"} />
              ) : (
                <p>No image available</p>
              )}
              <h3>{art.title}</h3>
              <p>{art.artistDisplayName}</p>
              <p className="text-xs text-gray-500 italic">source: {art.source}</p>
            </div>
          ))}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      )}
    </div>
  );
}

export default SearchPage;

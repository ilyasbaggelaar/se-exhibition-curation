import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchMesArtworks, searchChicagoArtworks } from "../api/mesuemApi";
import Pagination from "../components/Pagination";
import SkeletonBox from "../components/SkeletonBox";
import ArtworkPopUp from "../components/ArtworkPopUp";
import ArtworkFilter from "../components/ArtworkFilter";
import DateRange from "../components/DateRange";

function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const categoryParam = queryParams.get("q") || "art";
  const hasImagesParam = queryParams.get("hasImages") === "true";
  const tagsParam = queryParams.get("tags") === "true";
  const geoLocationParam = queryParams.get("geoLocation") || "";
  const dateBeginParam = queryParams.get("dateBegin") || "";
  const dateEndParam = queryParams.get("dateEnd") || "";
  const pageParam = parseInt(queryParams.get("page") || "1", 10);

  const [search, setSearch] = useState(categoryParam);
  const [hasImages, setHasImages] = useState(hasImagesParam);
  const [tags, setTags] = useState(tagsParam);
  const [geoLocation, setGeoLocation] = useState(geoLocationParam);
  const [date, setDate] = useState({ dateBegin: dateBeginParam, dateEnd: dateEndParam });
  const [page, setPage] = useState(pageParam);

  const [artworks, setArtworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null);
  const [popUpOpen, setPopUpOpen] = useState(false);

  const itemsPerPage = 20;

  // Sync URL with state
  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.set("q", search);
    if (hasImages) params.set("hasImages", "true");
    if (tags) params.set("tags", "true");
    if (geoLocation) params.set("geoLocation", geoLocation);
    if (date.dateBegin) params.set("dateBegin", date.dateBegin);
    if (date.dateEnd) params.set("dateEnd", date.dateEnd);
    if (page !== 1) params.set("page", String(page));

    navigate({ search: params.toString() }, { replace: true });
  }, [search, hasImages, tags, geoLocation, date, page, navigate]);

  // Fetch data
  useEffect(() => {
    const fetchArt = async () => {
      try {
        setLoading(true);

        const dateBegin = date.dateBegin ? parseInt(date.dateBegin, 10) : undefined;
        const dateEnd = date.dateEnd ? parseInt(date.dateEnd, 10) : undefined;

        const [metData, chicagoData] = await Promise.allSettled([
          searchMesArtworks(search, page, itemsPerPage, {
            tags,
            hasImages,
            geoLocation,
            dateBegin,
            dateEnd,
          }),
          searchChicagoArtworks(search, page, itemsPerPage, {
            geoLocation,
            dateBegin,
            dateEnd,
          }),
        ]);

        const metResult = metData.status === "fulfilled" ? metData.value : { artworks: [], total: 0 };
        const chicagoResult = chicagoData.status === "fulfilled" ? chicagoData.value : { artworks: [], total: 0 };

        let combined = [];
        let total = 0;

        if (categoryParam === "Chicago") {
          combined = [...chicagoResult.artworks];
          total = chicagoResult.artworks.length;
        } else if (categoryParam === "Met") {
          combined = [...metResult.artworks.map((a) => ({ ...a, source: "Met" }))];
          total = metResult.total;
        } else {
          combined = [
            ...metResult.artworks.map((a) => ({ ...a, source: "Met" })),
            ...chicagoResult.artworks,
          ];
          total = metResult.total + (page === 1 ? chicagoResult.artworks.length : 0);
        }

        setArtworks(combined);
        setTotalResults(total);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchArt();
  }, [search, page, hasImages, tags, geoLocation, date, categoryParam]);

  const totalPages = Math.ceil(totalResults / itemsPerPage);

  return (
    <div className="pt-16 p-4 max-w-screen-xl mx-auto">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
        <ArtworkFilter geoLocation={geoLocation} onChange={setGeoLocation} onPage={setPage} />
        <DateRange dateBegin={date.dateBegin} dateEnd={date.dateEnd} onChange={setDate} onPage={setPage} />
        <div className="flex flex-col w-full max-w-xs">
          <label className="block mb-1 text-sm font-medium text-gray-700">Search Artworks</label>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="e.g., Van Gogh"
            className="border border-gray-300 rounded-2xl px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-200 focus:outline-none"
          />
          <div className="mt-2 flex space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="flex-1 px-4 py-2 bg-gray-200 text-sm rounded-xl disabled:opacity-50 hover:bg-gray-300 transition"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className="flex-1 px-4 py-2 bg-gray-200 text-sm rounded-xl hover:bg-gray-300 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="px-4">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <SkeletonBox key={i} className="w-64 h-80 rounded-xl" />
            ))}
          </div>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {artworks.map((art) => (
            <div
              key={art.objectID}
              className="break-inside-avoid rounded overflow-hidden shadow bg-white transition hover:sepia-50 hover:scale-[1.02]"
              onClick={() => {
                setSelectedArtwork(art);
                setPopUpOpen(true);
              }}
            >
              {art.primaryImageSmall ? (
                <img
                  src={art.primaryImageSmall}
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  alt={art.title || "Artwork"}
                  className="w-full mb-2"
                />
              ) : (
                <div className="bg-gray-100 h-48 flex items-center justify-center text-sm text-gray-500">
                  No image available
                </div>
              )}
              <div className="p-2">
                <h3 className="font-semibold text-sm">{art.title}</h3>
                <p className="text-xs text-gray-700">{art.artistDisplayName}</p>
                <p className="text-[10px] text-gray-400 italic">Source: {art.source}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      )}

      <ArtworkPopUp
        isOpen={popUpOpen}
        onClose={() => setPopUpOpen(false)}
        artwork={selectedArtwork}
      />
    </div>
  );
}

export default SearchPage;

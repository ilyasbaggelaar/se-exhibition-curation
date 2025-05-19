import { use, useEffect, useState } from "react";
import { searchMesArtworks } from "../api/mesuemApi";

function SearchPage() {
  const [artworks, setArtworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("plato");
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const pageButtons = [];

  for (let i = 1; i < totalPages; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => setPage(i)}
        style={{
          margin: "0 4px",
          padding: "4px 8px",
          backgroundColor: i === page ? "black" : "white",
          color: i === page ? "white" : "black",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        {i}
      </button>
    );
  }

  useEffect(() => {
    const fetchArt = async () => {
      try {
        setLoading(true);
        const { artworks, total } = await searchMesArtworks(
          search,
          page,
          itemsPerPage
        );
        setArtworks(artworks);
        setTotalResults(total);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchArt();
  }, [search, page]);

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
            </div>
          ))}
          <div style={{ margin: "1rem 0" }}>
            {page > 1 && (
              <button onClick={() => setPage(page - 1)}>Previous</button>
            )}
            {pageButtons}
            {page < totalPages && (
              <button onClick={() => setPage(page + 1)}>Next</button>
            )}
          </div>
        </div>
      )}
      {/* <h2>Search Results...</h2>
            {loading ? (<p>Loading...</p>) : (
                <ul>
                    {artworks.map(art => (
                        <li key={art.objectID}>
                            <h3>{art.title}</h3>
                            <img src={art.primaryImageSmall} alt={art.title} style={{ maxWidth: '200px' }}/>
                        </li>
                    ))}
                </ul>
            )} */}
    </div>
  );
}

export default SearchPage;

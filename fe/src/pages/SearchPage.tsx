import { use, useEffect, useState } from "react";
import { searchMesArtworks } from "../api/mesuemApi";
import Pagination from "../components/Pagination";

function SearchPage() {
  const [artworks, setArtworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("plato");
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  // const maxPageButtons = 5;
  // const startPage = Math.max(1, page - Math.floor(maxPageButtons / 2));
  // const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  // const firstButton = startPage > 2 
  // const lastButton = endPage < totalPages - 1;

  // const pageButtons = [];

//   if (totalPages > 1) {
//     if (startPage > 1) {
//       pageButtons.push(
//         <button
//         key={1}
//         onClick={() => setPage(1)}
//         >
// 1
//         </button>
//       )
//     }
//   }

  // if (firstButton) {
  //   pageButtons.push(<span key="start-button">...</span>)
  // }



  // for (let i = startPage; i <= endPage; i++) {
  //   pageButtons.push(
  //     <button
  //       key={i}
  //       onClick={() => setPage(i)}
  //       style={{
  //         margin: "0 4px",
  //         padding: "4px 8px",
  //         backgroundColor: i === page ? "black" : "white",
  //         color: i === page ? "white" : "black",
  //         border: "1px solid #ccc",
  //         borderRadius: "4px",
  //       }}
  //     >
  //       {i}
  //     </button>
  //   );
  // }

  // if (lastButton) {
  //   pageButtons.push(<span key="end-button">...</span>)
  // }

  // if (endPage < totalPages) {
  //   pageButtons.push(
  //     <button
  //     key={totalPages}
  //     onClick={() => setPage(totalPages)}
  //     style={{
  //       margin: "0 4px",
  //       padding: "4px 8px",
  //       backgroundColor: page === totalPages ? "black" : "white",
  //       color: page === totalPages ? "white" : "black",
  //       border: "1px solid #ccc",
  //       borderRadius: "4px",
  //     }}
  //     >
  //       {totalPages}
  //     </button>
  //   )
  // }

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

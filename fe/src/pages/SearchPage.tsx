import { use, useEffect, useState } from "react";
import { searchMesArtworks } from "../api/mesuemApi";

function SearchPage() {

    const [artworks, setArtworks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("plato");
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchArt = async () => {
            try {
                setLoading(true)
                const results = await searchMesArtworks(search, page, itemsPerPage);
                setArtworks(results);
                setLoading(false);
            } catch(err) {
                console.error(err);
            }
        }

        fetchArt()
    }, [search, page]);

    return (
        <div>

            <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search artworks..."
            />

            <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
                Previous
            </button>

            <button onClick={() => setPage((p) => p + 1)}>Next</button>

            {loading ? <p>loading...</p> : (
                <div>
                    {artworks.map((art) => (
                        <div key={art.objectID}>
                             <img src={art.primaryImageSmall} alt={art.title} />
                             <h3>{art.title}</h3>
                             <p>{art.artistDisplayName}</p>
                        </div>
                    ))}
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
    )

}

export default SearchPage;
import { useEffect, useState } from "react";
import { searchMesArtworks } from "../api/mesuemApi";

function SearchPage() {

    const [artworks, setArtworks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArt = async () => {
            try {
                const results = await searchMesArtworks('plato');
                setArtworks(results);
            } catch(err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchArt()
    }, []);

    return (
        <div>
            <h2>Search Results...</h2>
            {loading ? (<p>Loading...</p>) : (
                <ul>
                    {artworks.map(art => (
                        <li key={art.objectID}>
                            <h3>{art.title}</h3>
                            <img src={art.primaryImageSmall} alt={art.title} style={{ maxWidth: '200px' }}/>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )

}

export default SearchPage;
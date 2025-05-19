import axios from "axios";


const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export const searchMesArtworks = async (query: string, page: number, limit: number): Promise<{ artworks: any[], total: number}> => {
    const searchRes = await axios.get(`${BASE_URL}/search`, {
        params: {q: query, hasImages: true},
    });

    console.log(searchRes)
    const objectIDs = searchRes.data.objectIDs || [];
    const total = objectIDs.length;

    const start = (page - 1) * limit;

    const paginatedIDs = objectIDs.slice(start, start + limit);

    const promises = paginatedIDs.map(async (id: number) => {
        try {
            const {data} = await axios.get(`${BASE_URL}/objects/${id}`);
            return data;
        } catch (err) {
            return null;
        }
    });


    const results = await Promise.all(promises)

    const artworks = results.filter(Boolean);

    return {artworks, total}

}
import axios from "axios";


const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export const searchMesArtworks = async (query: string, page: number, limit: number): Promise<any[]> => {
    const searchRes = await axios.get(`${BASE_URL}/search`, {
        params: {q: query, hasImages: true},
    });

    console.log(searchRes)
    const objectIDs = searchRes.data.objectIDs || [];

    const start = (page - 1) * limit;

    const paginatedIDs = objectIDs.slice(start, start + limit);

    const promises = paginatedIDs.map((id: number) =>
         axios.get(`${BASE_URL}/objects/${id}`).then(res => res.data));


    return Promise.all(promises);

}
import axios from "axios";


const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export const searchMesArtworks = async (query: string) => {
    const searchRes = await axios.get(`${BASE_URL}/search`, {
        params: {q: query, hasImages: true},
    });

    console.log(searchRes)
    const objectIDs = searchRes.data.objectIDs?.slice(0, 10) || [];

    const promises = objectIDs.map(id =>
         axios.get(`${BASE_URL}/objects/${id}`).then(res => res.data));

    return Promise.all(promises);

}
import axios from "axios";
import qs from "qs";

const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export const searchMesArtworks = async (
  query: string,
  page: number,
  limit: number,
  options?: { tags?: boolean; hasImages?: boolean }
): Promise<{ artworks: any[]; total: number }> => {
  const baseParams: Record<string, string | boolean> = {
    q: query,
  };

  if (options?.tags) {
    baseParams.tags = "";
  }

  if (options?.hasImages) baseParams.hasImages = "true";

  let queryString = qs.stringify(baseParams);

  let count = 0;

  const fixedStr = queryString.replace(/=/g, (match) => {
    count++;
    if (count == 2) {
      return "";
    }
    return match;
  });

  const url = `${BASE_URL}/search?${fixedStr}`;

  const searchRes = await axios.get(url);

  console.log(url);
  console.log(searchRes);

  const objectIDs = searchRes.data.objectIDs || [];
  const total = objectIDs.length;

  const start = (page - 1) * limit;

  const paginatedIDs = objectIDs.slice(start, start + limit);

  const promises = paginatedIDs.map(async (id: number) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/objects/${id}`);
      return data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        console.warn(`object ID ${id} is not found`);
      }
      return null;
    }
  });

  const results = await Promise.all(promises);

  const artworks = results.filter(Boolean);

  return { artworks, total };
};

export const searchChicagoArtworks = async (
  query: string,
  page: number,
  limit: number
): Promise<{ artworks: any[]; total: number }> => {
  const url = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(
    query
  )}&fields=id,title,image_id,artist_title&limit=${limit}&page=${page}`;
  const response = await axios.get(url);

  const total = response.data.pagination.total;

  const artworks = response.data.data.map((item: any) => (
    {
    objectID: `chicago-${item.id}`,
    title: item.title,
    artistDisplayName: item.artist_title,
    primaryImageSmall: item.image_id ? `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg` : null,
    source: `Chicago`,
    }));

    return {artworks, total}
};

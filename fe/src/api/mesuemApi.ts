import axios from "axios";
import qs from "qs";

const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";


export const searchMesArtworks = async (
  query: string,
  page: number,
  limit: number,
  options?: { tags?: boolean; hasImages?: boolean; geoLocation?: string; dateBegin?: number; dateEnd?: number;}
): Promise<{ artworks: any[]; total: number }> => {
  const baseParams: Record<string, string | boolean | number> = {
    q: query,
  };

  if (options?.tags) {
    baseParams.tags = "";
  }

  if (options?.geoLocation) baseParams.geoLocation = options.geoLocation;

  if (options?.hasImages) baseParams.hasImages = "true";



if (
  typeof options?.dateBegin === "number" &&
  typeof options?.dateEnd === "number"
) {
  baseParams.dateBegin = options.dateBegin;
  baseParams.dateEnd = options.dateEnd;
}

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

  const objectIDs = searchRes.data.objectIDs || [];

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
return { artworks, total: searchRes.data.total || 0 };

};

export const searchChicagoArtworks = async (
  query: string,
  page: number,
  limit: number,
  options?: {
    geoLocation?: string;
    dateBegin?: number;
    dateEnd?: number;
  }
): Promise<{ artworks: any[]; total: number }> => {
  const params: Record<string, string> = {
    q: query,
    //place_of_origin and date_start are the queries needed, geoLocation, dateBegin&End doesn't work the same on this API.
    fields: "id,title,image_id,artist_title,credit_line,place_of_origin,date_start",
    limit: String(limit),
    page: String(page),
  };

  const queryString = new URLSearchParams(params).toString();
  const url = `https://api.artic.edu/api/v1/artworks/search?${queryString}`;
  console.log(url)
  const response = await axios.get(url);

  console.log(response.data.data)
  const rawData = response.data.data;

const filteredData = rawData.filter((item: any) => {
  let pass = true;

  if (options?.geoLocation) {
    const origin = item.place_of_origin?.toLowerCase() || "";
    const filterCountry = options.geoLocation.toLowerCase();
    if (!origin.includes(filterCountry)) {
      return false;
    }
  }

  if (options?.dateBegin !== undefined && options?.dateEnd !== undefined) {
    const date = typeof item.date_start === "number" ? item.date_start : null;
    if (date === null || date < options.dateBegin || date > options.dateEnd) {
      return false;
    }
  }

  return pass;
});

const artworks = filteredData.map((item: any) => ({
  objectID: `chicago-${item.id}`,
  title: item.title,
  artistDisplayName: item.artist_title,
  primaryImageSmall: item.image_id
    ? `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`
    : null,
  creditLine: item.credit_line || "No Description Available.",
  source: "Chicago",
}));

return { artworks, total: filteredData.length };
}

import {
    FULL_URL_COORDINATES_REGEXES,
    FULL_URL_REGEX,
    GOOGLE_MAPS_LINK_EXPAND_API_URL,
    GoogleMapsUrlType,
    SHORT_URL_PREFIXES,
} from "./GoogleMapsLinkService.config";

const getUrlType = (url: string): GoogleMapsUrlType => {
  if (SHORT_URL_PREFIXES.some(prefix => url.startsWith(prefix))) return GoogleMapsUrlType.SHORT;
  if (FULL_URL_REGEX.test(url)) return GoogleMapsUrlType.FULL;

  return GoogleMapsUrlType.INVALID;
}

const expandShortUrl = async (shortUrl: string): Promise<string | null> => {
    try {
        const response = await fetch(
            GOOGLE_MAPS_LINK_EXPAND_API_URL,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: shortUrl })
            }
        );

        const data = await response.json();

        return data.url;
    } catch (err) {
        console.error("Failed to expand URL:", err);

        return null;
    }
}

const extractCoordinatesFromExpandedUrl = (expandedUrl: string): Coordinates | null => {
  for (const regex of FULL_URL_COORDINATES_REGEXES) {
    const match = expandedUrl.match(regex);

    if (match) return { latitude: parseFloat(match[1]), longitude: parseFloat(match[2]) };
  }

    console.error("Failed to extract coordinates from expanded URL:", expandedUrl);

    return null;
}

const getCoordinatesFromUrl = async (url: string): Promise<Coordinates | null> => {
  const urlType = getUrlType(url);

  if (urlType === GoogleMapsUrlType.FULL) {
    return extractCoordinatesFromExpandedUrl(url);
  }

  if (urlType === GoogleMapsUrlType.SHORT) {
    const expandedUrl = await expandShortUrl(url);

    if (expandedUrl) return extractCoordinatesFromExpandedUrl(expandedUrl);
  }

  return null;
}

export default {
    getCoordinatesFromUrl
}
// TODO: Extract to .env
const API_URL = 'https://dark-glitter-fb94.ocampco.workers.dev';

// TODO: Extract to constants
enum GoogleMapsUrlType {
  SHORT = 'short',
  FULL = 'full',
  INVALID = 'invalid',
}

const SHORT_URL_PREFIXES = [
'https://maps.app.goo.gl/',
'https://goo.gl/maps/',
'https://goo.gl/app/maps/',
];
const FULL_URL_REGEX = /^https:\/\/(www\.)?(maps\.google\.|google\.[a-z.]{2,6}\/maps)/

const getUrlType = (url: string): GoogleMapsUrlType => {
  if (SHORT_URL_PREFIXES.some(prefix => url.startsWith(prefix))) return GoogleMapsUrlType.SHORT;
  if (FULL_URL_REGEX.test(url)) return GoogleMapsUrlType.FULL;

  return GoogleMapsUrlType.INVALID;
}

const expandShortUrl = async (shortUrl: string): Promise<string | null> => {
    try {
        const response = await fetch(
            API_URL,
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
  const patterns: RegExp[] = [
    /[?&]q=([\d.-]+),([\d.-]+)/,       // ?q=lat,lng
    /\/@([\d.-]+),([\d.-]+)/,           // /@lat,lng
    /!3d([\d.-]+)!4d([\d.-]+)/,        // !3d lat !4d lng
    /place\/([\d.-]+),([\d.-]+)/,       // place/lat,lng
  ];

  for (const pattern of patterns) {
    const match = expandedUrl.match(pattern);

    if (match) return { latitude: parseFloat(match[1]), longitude: parseFloat(match[2]) };
  }

    console.error("Failed to extract coordinates from expanded URL:", expandedUrl);

    return null;
}

const getCoordinatesFromUrl = async (url: string): Promise<Coordinates | null> => {
  const urlType = getUrlType(url);

  if (urlType === GoogleMapsUrlType.INVALID) {
    return null;
  }

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
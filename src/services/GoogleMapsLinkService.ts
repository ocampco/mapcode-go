// TODO: Extract to .env
const API_URL = 'https://dark-glitter-fb94.ocampco.workers.dev';

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

export default {
    expandShortUrl,
    extractCoordinatesFromExpandedUrl,
}
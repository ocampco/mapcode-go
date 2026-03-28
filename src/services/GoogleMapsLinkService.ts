import { GOOGLE_MAPS_LINK_EXPAND_API_URL } from "./GoogleMapsLinkService.config";

const expandShortUrl = async (shortUrl: string): Promise<string> => {
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
    } catch (error) {
        console.error(`Failed to expand URL: ${shortUrl} due to ${error}`);
        throw new Error(`Failed to expand URL: ${shortUrl}`);
    }
}

export default {
    expandShortUrl
}
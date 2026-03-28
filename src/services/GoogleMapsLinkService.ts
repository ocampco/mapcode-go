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

export default {
    expandShortUrl
}
export const expandShortUrl = async (shortUrl: string): Promise<string | null> => {
    try {
        const response = await fetch(shortUrl, { method: 'HEAD', redirect: 'follow' });

        console.log("🔥 response=", response);

        return response.url;
    } catch (err) {
        console.error("Failed to expand URL:", err);

        return null;
    }
}
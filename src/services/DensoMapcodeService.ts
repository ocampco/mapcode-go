import { DENSO_MAPCODE_API_URL } from "./DensoMapcodeService.config";

const getMapCode = async (latitude: string, longitude: string): Promise<string> => {
    try {
        const response = await fetch(
            DENSO_MAPCODE_API_URL,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    latitude: parseFloat(latitude), 
                    longitude: parseFloat(longitude) 
                })
            }
        );

        const data = await response.json();

        return data.mapcode;
    } catch (error) {
        console.error(`Failed to get map code: ${latitude}, ${longitude} due to ${error}`);
        throw new Error(`Failed to get map code: ${latitude}, ${longitude}`);
    }
}

export default {
    getMapCode
}
import { useCoordinatesFromUrl } from "./useCoordinatesFromUrl";
import { useMapcodeFromCoordinates } from "./useMapcodeFromCoordinates";

export const useMapcodeFromUrl = (url: string) => {
    const { coordinates, isLoading: isCoordinatesLoading, error: coordinatesError } = useCoordinatesFromUrl(url);
    const { mapcode, isLoading: isMapcodeLoading, error: mapcodeError } = useMapcodeFromCoordinates(coordinates);

    return {
        coordinates,
        mapcode,
        isLoading: isCoordinatesLoading || isMapcodeLoading,
        error: coordinatesError || mapcodeError
    };
};
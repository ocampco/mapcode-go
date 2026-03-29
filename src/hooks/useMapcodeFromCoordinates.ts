import DensoMapcodeService from "@/services/DensoMapcodeService";
import { useEffect, useState } from "react";

export const useMapcodeFromCoordinates = (coordinates: Coordinates | null) => {
  const [mapcode, setMapcode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
     if (!coordinates) return;

    const getMapcode = async (coordinates: Coordinates) => {
      try {
        setIsLoading(true);
        setMapcode(null);
        setError(null);

        const result = await DensoMapcodeService.getMapCode(coordinates.latitude, coordinates.longitude);

        setMapcode(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getMapcode(coordinates);
  }, [coordinates]);

  return { mapcode, isLoading, error };
};
import GoogleMapsLinkService from "@/services/GoogleMapsLinkService";
import { useState } from "react";
import { FULL_URL_COORDINATES_REGEXES, GoogleMapsUrlType } from "./useCoordinatesFromUrl.config";
import { FULL_URL_REGEX } from "./useCoordinatesFromUrl.config";
import { SHORT_URL_PREFIXES } from "./useCoordinatesFromUrl.config";

const getUrlType = (url: string): GoogleMapsUrlType => {
  if (SHORT_URL_PREFIXES.some(prefix => url.startsWith(prefix))) return GoogleMapsUrlType.SHORT;
  if (FULL_URL_REGEX.test(url)) return GoogleMapsUrlType.FULL;

  return GoogleMapsUrlType.INVALID;
}

const extractCoordinatesFromExpandedUrl = (expandedUrl: string): Coordinates => {
  for (const regex of FULL_URL_COORDINATES_REGEXES) {
    const match = expandedUrl.match(regex);

    if (match) {
      return { latitude: match[1], longitude: match[2] };
    }
  }

  throw new Error(`Failed to extract coordinates from expanded URL: ${expandedUrl}`);
}

const getCoordinatesFromUrl = async (url: string): Promise<Coordinates> => {
  const urlType = getUrlType(url);

  if (urlType === GoogleMapsUrlType.INVALID) {
    throw new Error(`Not a valid Google Maps URL: ${url}`);
  }
  
  if (urlType === GoogleMapsUrlType.FULL) {
    return extractCoordinatesFromExpandedUrl(url);
  }

  const expandedUrl = await GoogleMapsLinkService.expandShortUrl(url);

  return extractCoordinatesFromExpandedUrl(expandedUrl);
}

export const useCoordinatesFromUrl = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCoordinates = async (url: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const result  = await getCoordinatesFromUrl(url);

      setCoordinates(result);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { getCoordinates, coordinates, isLoading, error };
};
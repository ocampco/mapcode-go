import { useSearchParams } from "react-router";
import { Result } from "./Result";
import { ErrorAlert } from "./ErrorAlert";
import { useMapcodeFromUrl } from "@/hooks/useMapcodeFromUrl";
import { LinkSearch } from "./LinkSearch";

export const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const searchLink = searchParams.get('link') || '';
  const { coordinates, mapcode, error } = useMapcodeFromUrl(searchLink);

    return (
      <>
        <ErrorAlert error={error} />
        <LinkSearch resultLink={searchLink}/>
        <Result coordinates={coordinates} mapcode={mapcode} />
      </>
    );
};
import DensoMapcodeService from "@/services/DensoMapcodeService";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Spinner } from "./ui/spinner";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { useCoordinatesFromUrl } from "@/hooks/useCoordinatesFromUrl";
import { Result } from "./Result";
import { ErrorAlert } from "./ErrorAlert";

export const LinkSearch = () => {
  const [searchParams] = useSearchParams();
  const searchLink = searchParams.get('link');
  const [inputLink, setInputLink] = useState<string>(searchLink || '');
  const [mapcodeResult, setMapcodeResult] = useState<string>('');
  const { coordinates, isLoading, error } = useCoordinatesFromUrl(searchLink || '');
  const navigate = useNavigate();

  useEffect(() => {
    const getMapcodeFromLink = async () => {
      if (coordinates) {
        // TODO: Handle error
        const mapcode = await DensoMapcodeService.getMapCode(coordinates.latitude, coordinates.longitude);

        setMapcodeResult(mapcode);
      }
    }

    if (mapcodeResult || error) return;
    if (searchLink) getMapcodeFromLink();

  }, [searchParams, mapcodeResult, error, inputLink, searchLink, coordinates]);

  const handleSearch = () => {
    const isPendingSearch = inputLink.trim() !== searchParams.get('link');
    
    if (!isPendingSearch) {
      return;
    }

    navigate(`/?link=${inputLink}`);
  }

    return (
      <>
        <ErrorAlert error={error} />
        <Card>
          <CardHeader>
            <CardTitle>Mapcode using Google Maps link 🔗</CardTitle>
            <CardDescription>Enter the link of the location you want to find the mapcode for</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Google Maps Link</Label>
                <Input
                  type="text"
                  required
                  value={inputLink}
                  onChange={(e) => setInputLink(e.target.value)}
                  placeholder="e.g. https://maps.app.goo.gl/BwMn67pGKoqUsz5m6"
                  autoComplete="off"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="button" disabled={isLoading || !inputLink} className="w-full" onClick={handleSearch}>
              {isLoading && <Spinner data-icon="inline-start" />}
              GO get mapcode
            </Button>
          </CardFooter>
        </Card>
        <Result coordinates={coordinates} mapcode={mapcodeResult} />
      </>
    );
};
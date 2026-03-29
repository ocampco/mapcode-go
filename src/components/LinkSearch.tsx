import DensoMapcodeService from "@/services/DensoMapcodeService";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Spinner } from "./ui/spinner";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { useCoordinatesFromUrl } from "@/hooks/useCoordinatesFromUrl";

export const LinkSearch = () => {
  const [inputGoogleMapsLink, setInputGoogleMapsLink] = useState<string>('');
  const [mapcodeResult, setMapcodeResult] = useState<string>('');
  const [searchParams] = useSearchParams();
  const { getCoordinates, coordinates, isLoading, error } = useCoordinatesFromUrl();
  const navigate = useNavigate();

  useEffect(() => {
    const getMapcodeFromLink = async (link: string) => {
      setInputGoogleMapsLink(link);

      await getCoordinates(link);

      if (coordinates) {
        // TODO: Handle error
        const mapcode = await DensoMapcodeService.getMapCode(coordinates.latitude, coordinates.longitude);

        setMapcodeResult(mapcode);
      }
    }

    if (mapcodeResult || error) {
      return;
    }

    const link = searchParams.get('link');

    if (link) {
      getMapcodeFromLink(link);
    }
  }, [searchParams, mapcodeResult, error]);

    return (
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
                value={inputGoogleMapsLink}
                onChange={(e) => setInputGoogleMapsLink(e.target.value)}
                placeholder="e.g. https://maps.app.goo.gl/BwMn67pGKoqUsz5m6"
                autoComplete="off"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="button" disabled={isLoading} className="w-full" onClick={() => navigate(`/?link=${inputGoogleMapsLink}`)}>
            {isLoading && <Spinner data-icon="inline-start" />}
            GO get mapcode
          </Button>
        </CardFooter>
      </Card>
    );
};
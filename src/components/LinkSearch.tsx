import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Spinner } from "./ui/spinner";
import { useNavigate, useSearchParams } from "react-router";
import { useState } from "react";
import { Result } from "./Result";
import { ErrorAlert } from "./ErrorAlert";
import { useMapcodeFromUrl } from "@/hooks/useMapcodeFromUrl";

export const LinkSearch = () => {
  const [searchParams] = useSearchParams();
  const searchLink = searchParams.get('link') || '';
  const { coordinates, mapcode, isLoading, error } = useMapcodeFromUrl(searchLink);
  const [inputLink, setInputLink] = useState<string>(searchLink);
  const navigate = useNavigate();

  const handleSearch = () => {
    const isPendingSearch = inputLink.trim() !== searchLink;
    
    if (!isPendingSearch) {
      return;
    }

    navigate(`/?link=${encodeURIComponent(inputLink)}`);
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
            <Button size="lg" type="submit" disabled={isLoading || !inputLink} className="w-full" onClick={handleSearch}>
              {isLoading && <Spinner data-icon="inline-start" />}
              GO get mapcode
            </Button>
          </CardFooter>
        </Card>
        <Result coordinates={coordinates} mapcode={mapcode} />
      </>
    );
};
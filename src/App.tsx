import { useEffect, useState } from 'react'
import './App.css'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import DensoMapcodeService from './services/DensoMapcodeService';
import { Label } from '@radix-ui/react-label';
import { Input } from './components/ui/input';
import { useCoordinatesFromUrl } from './hooks/useCoordinatesFromUrl';
import { Spinner } from './components/ui/spinner';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { CircleAlert } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
import { Result } from './components/Result';

const App = () => {
  const [inputLatitude, setInputLatitude] = useState<string>('');
  const [inputLongitude, setInputLongitude] = useState<string>('');
  const [inputGoogleMapsLink, setInputGoogleMapsLink] = useState<string>('');
  const [mapcodeResult, setMapcodeResult] = useState<string>('');
  const { getCoordinates, coordinates, isLoading, error } = useCoordinatesFromUrl();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const getMapcodeFromCoordinates = async (latitude: string, longitude: string) => {
      setInputLatitude(latitude);
      setInputLongitude(longitude);

      const mapcode = await DensoMapcodeService.getMapCode(latitude, longitude);

      setMapcodeResult(mapcode);
    }

    if (!mapcodeResult || error) {
      return;
    }

    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');

    if (latitude && longitude) {
      getMapcodeFromCoordinates(latitude, longitude);
    }
  }, [searchParams]);

  useEffect(() => {
    const getMapcodeFromLink = async (link: string) => {
      setInputGoogleMapsLink(link);

      await getCoordinates(link);

      if (coordinates) {
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
    <>
      {error && <Alert>
        <CircleAlert />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>}

      <Card>
        <CardHeader>
          <CardTitle>Mapcode using coordinates 📍</CardTitle>
          <CardDescription>Enter the latitude and longitude of the location you want to find the mapcode for</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Latitude</Label>
              <Input
                type="number"
                required
                value={inputLatitude}
                onChange={(e) => setInputLatitude(e.target.value)}
                placeholder="e.g. 40.7128"
                autoComplete="off"
              />
            </div>
            <div className="grid gap-2">
              <Label>Longitude</Label>
              <Input
                type="number"
                required
                value={inputLongitude}
                onChange={(e) => setInputLongitude(e.target.value)}
                placeholder="e.g. -74.0060"
                autoComplete="off"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            className="w-full"
            onClick={() => navigate(`/?latitude=${inputLatitude}&longitude=${inputLongitude}`)}
          >
            GO get mapcode
          </Button>
        </CardFooter>
      </Card>

      <Card >
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

      {mapcodeResult && coordinates && <Result coordinates={coordinates} mapcode={mapcodeResult} />}
    </>
  );
};

export default App;

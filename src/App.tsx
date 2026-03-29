import { useState } from 'react'
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

const App = () => {
  const [inputLatitude, setInputLatitude] = useState<string>('');
  const [inputLongitude, setInputLongitude] = useState<string>('');
  const [inputGoogleMapsLink, setInputGoogleMapsLink] = useState<string>('');
  const [mapcodeResult, setMapcodeResult] = useState<string>('');
  const { getCoordinates, coordinates, isLoading, error } = useCoordinatesFromUrl();

  const handleMapcodeFromCoordinates = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const mapcode = await DensoMapcodeService.getMapCode(inputLatitude, inputLongitude);

    setMapcodeResult(mapcode);
  };

  const handleMapcodeFromGoogleMapsLink = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await getCoordinates(inputGoogleMapsLink);

    if (coordinates) {
      const mapcode = await DensoMapcodeService.getMapCode(coordinates.latitude, coordinates.longitude);

      setMapcodeResult(mapcode);
    }
  };

  return (
    <>
      {error && <Alert className="w-full max-w-sm mx-auto text-left mb-4">
        <CircleAlert />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>}

      <Card className="w-full max-w-sm mx-auto text-left mb-4">
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
          <Button type="button" className="w-full" onClick={handleMapcodeFromCoordinates}>
            GO get mapcode
          </Button>
        </CardFooter>
      </Card>

      <Card className="w-full max-w-sm mx-auto text-left mb-4">
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
          <Button type="button" disabled={isLoading} className="w-full" onClick={handleMapcodeFromGoogleMapsLink}>
            {isLoading && <Spinner data-icon="inline-start" />}
            GO get mapcode
          </Button>
        </CardFooter>
      </Card>

      {mapcodeResult && !error && <Card className="relative mx-auto w-full max-w-sm pt-0">
        <div className="absolute inset-0 z-30 aspect-video" />
        <iframe
          src={`https://www.google.com/maps?q=${coordinates?.latitude},${coordinates?.longitude}&z=15&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy" />
        <CardHeader>
          <CardTitle>Your mapcode is: {mapcodeResult}</CardTitle>
        </CardHeader>
      </Card>}
    </>
  );
};

export default App;

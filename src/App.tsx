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
import { expandShortUrl } from './services/GoogleMapsLinkService';

const App = () => {
  const [inputLatitude, setInputLatitude] = useState<string>('');
  const [inputLongitude, setInputLongitude] = useState<string>('');
  const [inputGoogleMapsLink, setInputGoogleMapsLink] = useState<string>('');

  // TODO: Move to server
  const handleMapcodeFromCoordinates = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("🔥 inputLatitude=", inputLatitude);
    console.log("🔥 inputLongitude=", inputLongitude);

    const mapcode = DensoMapcodeService.mapCode(inputLatitude, inputLongitude);
    console.log("🔥 mapcode=", mapcode);
  };

  // TODO: Move to server
  const handleMapcodeFromGoogleMapsLink = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("🔥 inputGoogleMapsLink=", inputGoogleMapsLink);

    const expandedUrl = await expandShortUrl(inputGoogleMapsLink);
    console.log("🔥 expandedUrl=", expandedUrl);
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        🇯🇵 Mapcode GO
      </h1>
      <p className="text-muted-foreground text-xl mb-4">
        Driving through Japan made easy
      </p>

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

      <Card className="w-full max-w-sm mx-auto text-left">
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
          <Button type="button" className="w-full" disabled={true} onClick={handleMapcodeFromGoogleMapsLink}>
            Coming soon
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default App;

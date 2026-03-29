import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import DensoMapcodeService from '@/services/DensoMapcodeService';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { useNavigate, useSearchParams } from 'react-router';

export const CoordinatesSearch = () => {
  const [inputLatitude, setInputLatitude] = useState<string>('');
  const [inputLongitude, setInputLongitude] = useState<string>('');
  const [mapcodeResult, setMapcodeResult] = useState<string>('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const getMapcodeFromCoordinates = async (latitude: string, longitude: string) => {
      setInputLatitude(latitude);
      setInputLongitude(longitude);

      // TODO: Handle error
      const mapcode = await DensoMapcodeService.getMapCode(latitude, longitude);

      setMapcodeResult(mapcode);
    }

    if (!mapcodeResult) {
      return;
    }

    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');

    if (latitude && longitude) {
      getMapcodeFromCoordinates(latitude, longitude);
    }
  }, [searchParams]);

    return (
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
    );
};
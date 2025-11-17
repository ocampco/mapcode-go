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

const App = () => {
  const [inputLatitude, setInputLatitude] = useState<string>('');
  const [inputLongitude, setInputLongitude] = useState<string>('');

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("🔥 handleSubmit");
    e.preventDefault();
    console.log("🔥 inputLatitude=", inputLatitude);
    console.log("🔥 inputLongitude=", inputLongitude);

    const mapcode = DensoMapcodeService.mapCode(inputLatitude, inputLongitude);
    console.log("🔥 mapcode=", mapcode);
  };

  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Mapcode GO
      </h1>
      <p className="text-muted-foreground text-xl mb-4">
        Drive through Japan made easy
      </p>

      <Card className="w-full max-w-sm mx-auto text-left">
        <CardHeader>
          <CardTitle>Mapcode using coordinates</CardTitle>
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
          <Button type="button" className="w-full" onClick={handleSubmit}>
            GO get Mapcode
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default App;

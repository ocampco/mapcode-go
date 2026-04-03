import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useNavigate, useSearchParams } from "react-router";
import { useState } from "react";

// TODO: Make reusable
export const LinkSearch = () => {
  const [searchParams] = useSearchParams();
  const searchLink = searchParams.get('link') || '';
  const [inputLink, setInputLink] = useState<string>(searchLink);
  const navigate = useNavigate();

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
                value={inputLink}
                onChange={(e) => setInputLink(e.target.value)}
                placeholder="e.g. https://maps.app.goo.gl/BwMn67pGKoqUsz5m6"
                autoComplete="off"
              />
              
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            size="lg"
            type="submit"
            // TODO: Validate input
            disabled={!inputLink.trim()}
            className="w-full"
            onClick={() => navigate(`/result?link=${encodeURIComponent(inputLink.trim())}`)}>
            GO get mapcode
          </Button>
        </CardFooter>
      </Card>
    );
};
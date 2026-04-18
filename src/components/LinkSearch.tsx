import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Field, FieldDescription, FieldLabel } from "./ui/field";

const isUrl = (link: string) => {
  try {
    new URL(link.trim());
    return true;
  } catch {
    return false;
  }
}

type LinkSearchProps = {
  resultLink: string;
}
export const LinkSearch = ({ resultLink }: LinkSearchProps) => {
  const [inputLink, setInputLink] = useState<string>(resultLink || '');
  const [isValidLink, setIsValidLink] = useState<boolean>(isUrl(resultLink));
  const navigate = useNavigate();
  const shouldShowError = !isValidLink && Boolean(inputLink.trim());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLink(e.target.value);
    setIsValidLink(true);
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(!isUrl(inputLink)) {
      setIsValidLink(false);
      return;
    }

    navigate(`/search?link=${encodeURIComponent(inputLink.trim())}`);
  };

    return (
      <Card>
        <CardHeader>
          <CardTitle>Mapcode using Google Maps link 🔗</CardTitle>
          <CardDescription>Enter the link of the location you want to find the mapcode for</CardDescription>
        </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Field data-invalid={shouldShowError}>
                    <FieldLabel htmlFor="link">
                      Google Maps Link
                    </FieldLabel>
                    <Input
                      id="link"
                      type="text"
                      required
                      value={inputLink}
                      onChange={handleInputChange}
                      placeholder="e.g. https://maps.app.goo.gl/BwMn67pGKoqUsz5m6"
                      autoComplete="off"
                      aria-invalid={shouldShowError}
                    />
                    {shouldShowError && <FieldDescription>Please enter a valid Google Maps link.</FieldDescription>}
                  </Field>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              size="lg"
              type="submit"
              disabled={!inputLink.trim()}
              className="w-full"
              onClick={handleSubmit}
            >
              GO get mapcode
            </Button>
          </CardFooter>
      </Card>
    );
};
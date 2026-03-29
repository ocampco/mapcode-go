import { CardHeader, CardTitle } from "./ui/card";
import { Card } from "./ui/card";

type ResultProps = {
    coordinates: Coordinates | null;
    mapcode?: string;
}

export const Result = ({ coordinates, mapcode }: ResultProps) => {
    if (!coordinates || !mapcode) {
        return null;
    }

    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-video" />
            <iframe
                src={`https://www.google.com/maps?q=${coordinates?.latitude},${coordinates?.longitude}&z=15&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy" />
            <CardHeader>
                <CardTitle>Your mapcode is: {mapcode}</CardTitle>
            </CardHeader>
        </Card>
    )
};
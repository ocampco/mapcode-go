import { CircleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

type ErrorAlertProps = {
    error: string | null;
}

export const ErrorAlert = ({ error }: ErrorAlertProps) => {
    if (!error) return null;

    return (
        <Alert>
            <CircleAlert />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {error}
            </AlertDescription>
        </Alert>
    );
};
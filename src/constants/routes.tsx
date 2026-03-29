import type { ReactNode } from "react";
import App from '../App';

type Routes = {
  path: string;
  element: ReactNode;
};

export const BASE_PATH = '/mapcode-go';

export const ROUTES: Routes[] = [{
    path: '/',
    element: <App />,
}]
import { BASE_PATH, ROUTES } from "./constants/routes";
import { BrowserRouter, Route, Routes } from 'react-router';

export const Router = () => (
    <BrowserRouter basename={BASE_PATH}>
        <Routes>
            {ROUTES.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
        </Routes>
    </BrowserRouter>
);
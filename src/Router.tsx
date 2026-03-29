import { Layout } from "./components/Layout";
import { BASE_PATH, ROUTES } from "./constants/routes";
import { BrowserRouter, Route, Routes } from 'react-router';

export const Router = () => (
    <BrowserRouter basename={BASE_PATH}>
        <Routes>
            <Route element={<Layout />}>
                {ROUTES.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}
            </Route>
        </Routes>
    </BrowserRouter>
);
import App from "./App";
import { Layout } from "./components/Layout";
import { BrowserRouter, Route, Routes } from 'react-router';

export const Router = () => (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<App />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
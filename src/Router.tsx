import App from "./App";
import { Layout } from "./components/Layout";
import { BrowserRouter, Route, Routes } from 'react-router';
import { SearchResult } from "./components/SearchResult";

export const Router = () => (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<App />} />
                <Route path="search" element={<SearchResult />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
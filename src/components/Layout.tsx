import { Outlet } from "react-router";

export const Layout = () => (
    <>
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
            🇯🇵 Mapcode GO
        </h1>
        <p className="text-muted-foreground text-xl mb-4">
            Driving through Japan made easy
        </p>
        <div className="w-full max-w-sm mx-auto text-left flex flex-col gap-4">
            <Outlet />
        </div>
    </>
  );


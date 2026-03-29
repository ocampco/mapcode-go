import { Outlet } from "react-router";

export const Layout = () => (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        🇯🇵 Mapcode GO
      </h1>
      <p className="text-muted-foreground text-xl mb-4">
        Driving through Japan made easy
      </p>
      <Outlet />
    </>
  );


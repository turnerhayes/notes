import { Outlet } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";

export const Layout = () => {
  return (
    <main>
      <header>
        <Breadcrumbs />
      </header>
      <Outlet />
    </main>
  );
};

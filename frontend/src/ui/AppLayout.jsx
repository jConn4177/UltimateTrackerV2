import React from "react";
import Loader from "./Loader";
import { Outlet, useNavigation } from "react-router-dom";
import NavbarMain from "./header/NavbarMain";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div>
      {isLoading && <Loader />}

      <NavbarMain />

      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;

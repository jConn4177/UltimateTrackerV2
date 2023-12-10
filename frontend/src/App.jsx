import { RouterProvider, createBrowserRouter } from "react-router-dom";

import React from "react";
import Error from "./ui/Error";
import Home from "./ui/home/Home.jsx";
import Login from "./ui/login/Login.jsx";
import Register from "./ui/register/Register";
import CreateNewTournament from "./features/tournaments/CreateNewTournament";
import TournamentPage from "./features/tournaments/TournamentPage";
import TournamentList from "./features/tournaments/TournamentList";
import RequireAuth from "./features/auth/RequireAuth";
import UserList from "./features/users/UserList";
import TournamentRegistration from "./features/tournaments/TournamentRegistration.jsx";
import MyTournamentsPage from "./features/users/MyTournamentsPage";
import AppLayout from "./ui/AppLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/tournaments/list",
        element: <TournamentList />,
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/usersList",
            element: <UserList />,
          },
          {
            path: "/tournamentRegistration",
            element: <TournamentRegistration />,
          },
          {
            path: "/tournaments/new",
            element: <CreateNewTournament />,
          },
          {
            path: "/tournaments/myTournaments",
            element: <MyTournamentsPage />,
          },
          {
            path: "/tournaments/:id",
            element: <TournamentPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

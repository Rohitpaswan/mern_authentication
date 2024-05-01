import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/** import all components */
import Username from "./components/Username";
import Register from "./components/Register";
import PageNotfound from "./components/PageNotfound";
import Password from "./components/Password";
import Reset from "./components/Reset";
import Recovery from "./components/Recovery";
import Profile from "./components/Profile";
import { Toaster } from "react-hot-toast";

/** root routes */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Username></Username>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/password",
    element: <Password />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/recovery",
    element: <Recovery />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "*",
    element: <PageNotfound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
     
    </>
  );
}

export default App;

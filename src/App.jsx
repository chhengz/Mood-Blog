import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import RootLayout from "./components/layout/RootLayout";
import {
  Home,
  Blog,
  AboutPage,
  ViewPost,
  ErrorPage,
  LoginPage,
  ProtectedRoute,
} from "./pages";
import RefreshDebugPage from "./test/RefreshDebugPage";



const routers = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/about" replace /> },
      { path: "/home", element: <Home /> },
      {
        path: "/blog",
        element: <Blog />,
      },
      { path: "/blog/:slug", element: <ViewPost /> },
      { path: "/about", element: <AboutPage /> },
      // {
      //   path: "/refresh-debug",
      //   element: <RefreshDebugPage />
      // }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  
]);

const App = () => {
  return <RouterProvider router={routers} />;
};

export default App;

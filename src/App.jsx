import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import AboutPage from "./pages/about/AboutPage";
import ProtectedRoute from "./components/features/auth/ProtectedRoute";
import LoginPage from "./components/features/auth/LoginPage";
import ViewPost from "./pages/blog/ViewPost";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <div>404 Not Found</div>,
    children: [
      { index: true, element: <Navigate to="/about" replace /> },
      // { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/blog", element: <ProtectedRoute> <Blog /> </ProtectedRoute> },
      { path: "/blog/:slug", element:  <ViewPost /> },
      { path: "/about", element: <AboutPage /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />
  }
]);

const App = () => {
  return <RouterProvider router={routers} />;
};

export default App;

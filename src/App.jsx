import "./index.css";
import { Outlet, createBrowserRouter, useLocation } from "react-router-dom";
import Protected from "./components/Protected";
import SideNav from "./components/SideNav";
import Main from "./components/Main";
import Upload from "./components/upload";
import Login from "./pages/Login";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  return (
    <>
      {!isLoginPage ? (
        <div className="screen">
          <div className="sideNav">
            <SideNav />
          </div>
          <div className="main">
            <Outlet />
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    element: <Protected cmp={<App />} />,
    path: "/",
    children: [
      {
        element: <Protected cmp={<Login />} />,
        path: "/login",
      },
      {
        element: <Protected cmp={<Main name="In The News" />} />,
        path: "/news",
      },
      {
        element: <Protected cmp={<Main name="Insights" />} />,
        path: "/insights",
      },
      {
        element: <Protected cmp={<Main name="Case Studies" />} />,
        path: "/caseStudies",
      },
      {
        element: <Protected cmp={<Upload />} />,
        path: "/upload",
      },
    ],
  },
]);

export default appRouter;

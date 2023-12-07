import "./index.css";
import { Outlet, createBrowserRouter, useLocation } from "react-router-dom";
import Protected from "./components/Protected";
import Main from "./components/Main";
import Upload from "./components/Upload";
import Login from "./pages/Login";
import CaseStudyUpload from "./components/CaseStudyUpload";
import EditRow from "./components/EditRow";
import CsEditRow from "./components/CsEditRow";
import SideBar from "./components/SideBar";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  return (
    <>
      {!isLoginPage ? (
        <div className="screen">
          <div className="sideBar">
            <SideBar />
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
      {
        element: <Protected cmp={<CaseStudyUpload />} />,
        path: "/caseStudyUpload",
      },
      {
        element: <Protected cmp={<EditRow />} />,
        path: "/editRow",
      },
      {
        element: <Protected cmp={<CsEditRow />} />,
        path: "/csEditRow",
      },
    ],
  },
]);

export default appRouter;

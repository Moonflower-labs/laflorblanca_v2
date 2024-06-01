/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToastContainer } from "react-toastify";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "react-toastify/dist/ReactToastify.css";

const RootLayout = () => {
  return (
    <>
      <Header />
      <ToastContainer position="bottom-right" />
      <div data-testid="root-layout" className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
      <ScrollRestoration 
          getKey={(location, _matches) => {
            const paths = ["/", "/notifications"];
            return paths.includes(location.pathname)
              ? //  restore by pathname
                location.pathname
              : // everything else by location like the browser
                location.key;
          }} />
    </>
  );
};

export default RootLayout;

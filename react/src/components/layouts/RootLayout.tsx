/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToastContainer } from "react-toastify";
import { ScrollRestoration, useBeforeUnload, useNavigation, useSubmit } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "react-toastify/dist/ReactToastify.css";
import AnimatedOutlet from "./AnimatedOutlet";
import { useCallback } from "react";

const RootLayout = () => {
  const submit = useSubmit()
  const navigation = useNavigation()

  const isPageRefresh =
  navigation.state === "idle" &&
  navigation.formData == null &&
  navigation.location == null
  
  useBeforeUnload(
    useCallback(() => {

      if (!isPageRefresh) {
        submit(null, {
          method: 'post',
          action: '/logout',
        });
      }
 
  }, [isPageRefresh, submit])
  );


  

  return (
    <>
      <Header />
      <ToastContainer position="bottom-right" />
      <div data-testid="root-layout" className="min-h-screen">
        <AnimatedOutlet />
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

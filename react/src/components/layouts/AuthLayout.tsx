import { Outlet } from "react-router-dom";
import AnimatedPage from "../AnimatedPage";
const AuthLayout = () => {
  const staticPrefix = import.meta.env.PROD ? "/static" : "";

  const logoUrl = `${staticPrefix}/logo.jpeg`;
  return (
    <div data-testid="auth-layout" className="hero min-h-screen">
      <AnimatedPage>
        <div className="hero-content flex-col lg:flex-row gap-8">
          <img
            src={logoUrl}
            width={200}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <Outlet />
        </div>
      </AnimatedPage>
    </div>
  );
};

export default AuthLayout;

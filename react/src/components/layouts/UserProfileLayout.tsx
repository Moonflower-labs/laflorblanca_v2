import { NavLink, Outlet, useLocation } from 'react-router-dom'
import AnimatedPage from '../AnimatedPage'

export function UserProfileLayout() {
    const location = useLocation()
    const isExactMatch = location.pathname === "/user-profile"
  return (
    <div className="w-screen md:w-[75%] mx-auto">
    <h1 className="text-2xl text-center text-primary font-semibold pt-3">
      Mi Perfil
    </h1>
    <div role="tablist" className="tabs tabs-bordered">
      <NavLink 
        to={"/user-profile"} 
        role="tab" 
        className={({ isActive }) =>
          `tab ${isActive && isExactMatch  ? "tab-active" : ""} `
        }
      >
        Overview
      </NavLink>
      <NavLink 
        to={"favorites"} 
        role="tab" 
        className={({ isActive }) =>
          `tab ${isActive ? "tab-active" : ""} `
        }
      >
        Mis favoritos
      </NavLink>
      <NavLink 
        to={"subscription"} 
        role="tab" 
        className={({ isActive }) =>
          `tab ${isActive ? "tab-active" : ""} `
        }
        
      >
        Suscripción
      </NavLink>
    </div>
    <AnimatedPage>
        <Outlet />
    </AnimatedPage>
    
  </div>
  )
}



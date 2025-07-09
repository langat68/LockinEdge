// src/layouts/AuthLayout.tsx
import { Outlet } from "react-router-dom";
import "../Styling/AuthLayout.scss"; // optional for layout-specific styles

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
};

export default AuthLayout;

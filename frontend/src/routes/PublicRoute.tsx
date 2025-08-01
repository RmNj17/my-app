import React from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("authToken");

  if (user && token) {
    const redirectPath =
      JSON.parse(user).role === "guide"
        ? "/dashboard/guide"
        : "/dashboard/tourist";
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;

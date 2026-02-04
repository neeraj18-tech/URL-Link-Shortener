import { Navigate } from "react-router-dom";
import { useStoreContext } from "./contextApi/ContextApi";

const PrivateRoute = ({ children, publicPage }) => {
  const { token } = useStoreContext();

  // 🔓 Public pages (login / register)
  if (publicPage) {
    return token ? <Navigate to="/dashboard" replace /> : children;
  }

  // 🔐 Private pages (dashboard)
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

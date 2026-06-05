import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  if (!user.is_staff && !user.is_superuser) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default AdminRoute;
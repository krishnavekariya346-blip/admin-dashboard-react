import { Navigate } from "react-router-dom";
import { Auth } from "../loginSignup/auth";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = Auth((state) => state.isAuthenticated);

    if(!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
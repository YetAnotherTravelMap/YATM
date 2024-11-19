import {Navigate, useLocation} from 'react-router-dom'
import useAuth from './../../hooks/UseAuth'

// eslint-disable-next-line react/prop-types
export function RequireAuth({ children }) {
    const { authed } = useAuth();
    const location = useLocation();

    console.log("authed", authed);

    return authed === true ? (
        children
    ) : (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
}
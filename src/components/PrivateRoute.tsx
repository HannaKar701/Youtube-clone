import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children?: ReactNode;
}

const auth = sessionStorage.getItem('token');

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) =>
    !auth ? <Navigate to="/Youtube-clone/" /> : children;

export default PrivateRoute;

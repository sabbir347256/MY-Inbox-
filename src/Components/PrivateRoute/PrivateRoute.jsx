import {useContext } from "react";
import PropTypes from 'prop-types'
import { AuthProvider } from "../../Authprovider/Authcontext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ Children }) => {
    const { user, loading } = useContext(AuthProvider);
    const location = useLocation();
    if (loading) {
        return <p className="text-red-600 text-center"><span className="loading loading-infinity loading-lg"></span></p>;
    }
    if (user) {
        return Children;
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

PrivateRoute.propTypes = {
    Children: PropTypes.func
}
export default PrivateRoute;
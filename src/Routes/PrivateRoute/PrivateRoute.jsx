import React from 'react';
import UseAuth from '../../Hooks/UseAuth';
import { Navigate, useLocation } from 'react-router';
import Spinner from '../../components/common/Spinner/Spinner';
const PrivateRoute = ({children}) => {
const {user,loading} = UseAuth();
const location = useLocation();


if(loading){
    return <Spinner></Spinner>
}
if(!user){
    return <Navigate state={location.pathname} to="/login"></Navigate>
}


    return children
};

export default PrivateRoute;
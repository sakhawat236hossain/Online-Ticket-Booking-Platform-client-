import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";

const UseAuth = () => {
    const authInfo = useContext(AuthContext);
    return authInfo;
};

export default UseAuth;
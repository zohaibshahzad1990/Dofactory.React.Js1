
import { React, createContext, useMemo, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        token: localStorage.getItem("token"),
        userId: localStorage.getItem("userId"),
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
        email: localStorage.getItem("email"),
        role: localStorage.getItem("role"),
    });

    

    const login = (auth) => {

        setAuth(auth);

        localStorage.setItem("token", auth.token);
        localStorage.setItem("id", auth.id);
        localStorage.setItem("firstName", auth.firstName);
        localStorage.setItem("lastName", auth.lastName);
        localStorage.setItem("email", auth.email);
        localStorage.setItem("role", auth.role);

        axios.defaults.headers.common["Authorization"] = "Bearer " + auth.token;
    }

    const logout = async () => {

        setAuth({
            token: null,
            userId: null,
            firstName: null,
            lastName: null,
            email: null,
            role: null,
        });

        localStorage.clear();

        delete axios.defaults.headers.common["Authorization"];
    };

    // Memoized value of the authentication context
    const contextValue = useMemo(
        () => ({
            auth,
            login,
            logout
        }),
        [auth.token]
    );

    // Provide auth context to the children components
    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;

//if (auth.token) {
//} else {
//    delete axios.defaults.headers.common["Authorization"];
//    localStorage.clear(); //localStorage.removeItem("accessToken");
//}
//axios.defaults.headers.common["Authorization"] = "Bearer " + auth.token;
//// Function to set the authentication values (claims)
//const setAuth = (newAuth) => {
//    setAuth(newAuth);
//};

//useEffect(() => {
//    if (auth.token) {
//        axios.defaults.headers.common["Authorization"] = "Bearer " + auth.token;
//        localStorage.setItem("token", auth.token);
//        localStorage.setItem("id", auth.id);
//        localStorage.setItem("firstName", auth.firstName);
//        localStorage.setItem("lastName", auth.lastName);
//        localStorage.setItem("email", auth.email);
//        localStorage.setItem("role", auth.role);
//    } else {
//        delete axios.defaults.headers.common["Authorization"];
//        localStorage.clear(); //localStorage.removeItem("accessToken");
//    }
//}, [auth.token]);
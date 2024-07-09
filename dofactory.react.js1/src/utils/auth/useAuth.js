import { useContext } from "react";
import AuthContext from "/src/utils/auth/AuthProvider";

export const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;
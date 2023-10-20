import { AuthContext } from "../contexts/auth";
import { useContext } from "react";

function UseAuth() {
    const context = useContext(AuthContext)

    return context;

}

export { UseAuth };
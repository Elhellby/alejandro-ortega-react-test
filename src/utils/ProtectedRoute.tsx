import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LayoutNavbar from "../layout/navbar/layoutNavbar";
import LayoutFooter from "../layout/footer/layoutFooter";

interface Props {
    children: any;
}

const ProtectedRoute = (props: Props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = localStorage.getItem('user');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/login');
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return (isLoggedIn ? <>
        <LayoutNavbar />
        {props.children}
        <LayoutFooter />
    </> : null);
}
export default ProtectedRoute;
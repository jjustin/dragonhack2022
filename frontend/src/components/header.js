import { Link, useLocation } from 'react-router-dom'
import { Header } from "antd/lib/layout/layout";
import { useState, useEffect } from 'react';

let getLoginStatus = () => {
    if (window.location.pathname.startsWith("/login") ||
        window.location.pathname.startsWith("/register")) {
        return 1
    }
    if (false) {
        return 2
    } // logged in
    return 0
}

function H({ onChange }) {
    let [loginStatus, setLoggedIn] = useState(getLoginStatus());
    const location = useLocation();

    useEffect(() => {
        setLoggedIn(getLoginStatus());
    }, [location]);

    let login = null
    if (loginStatus == 0) {
        login = <Link to="/login" className="link">Login</Link>
    }
    if (loginStatus == 2) {
        login = <Link to="/account" className="link">Ikonca do profila</Link>
    }

    return <Header>
        <div style={{ display: "flex" }}>
            <Link to="/" className="home-button link">
                Triftify
            </Link>
            <div style={{ flexGrow: "1" }} />

            {login}
        </div>
    </Header>
}



export default H
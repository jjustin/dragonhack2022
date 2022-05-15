import { Link, useLocation } from 'react-router-dom'
import { Header } from "antd/lib/layout/layout";
import { useState, useEffect } from 'react';
import { PlusSquareOutlined, LogoutOutlined } from '@ant-design/icons';

let getLoginStatus = () => {
    if (window.location.pathname.startsWith("/login") ||
        window.location.pathname.startsWith("/register")) {
        return 1
    }
    if (localStorage.getItem("token") != null) {
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
        let name = localStorage.getItem("token")
        let balance = localStorage.getItem("balance")

        login = <div>
            <Link to="/list" className="link" style={{ fontSize: 20, paddingRight: 30 }}>
                <PlusSquareOutlined /> Add new listing
            </Link>
            Logged in as
            <Link to="/account" className="link"> {name} </Link>( {balance} swapcoins )
            <a className="link" onClick={() => {
                localStorage.clear("token");
                window.location.pathname = "/";
            }} style={{ fontSize: 20, paddingLeft: 30 }}><LogoutOutlined /></a>
        </div>
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
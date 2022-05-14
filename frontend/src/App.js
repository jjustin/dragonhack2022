import { Outlet, Link } from "react-router-dom";
import {
  Routes,
  Route,
} from "react-router-dom";
import React from "react";
import Listing from "./routes/listing";
import AllListings from "./routes/allListings";
import Login from "./routes/login";
import Register from "./routes/register";
import { Content, Header } from "antd/lib/layout/layout";


export default function App() {
  React.useEffect(() => {
    // this will fire each time the key changes
  }, []);

  let shouldHideLogin = () => {
    return window.location.pathname == "/login" ||
      window.location.pathname == "/register" ||
      false // hasToken
  }

  return (
    <div>
      <Content id="app-content">
        <Routes>
          <Route path="/listings/:id" element={<Listing />} />
          <Route path="/listings" element={<AllListings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Content>
    </div>
  );
}

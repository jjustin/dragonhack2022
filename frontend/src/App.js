import {
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import React from "react";
import Listing from "./routes/listing";
import AllListings from "./routes/allListings";
import Login from "./routes/login";
import Register from "./routes/register";
import Register2 from "./routes/register2";
import Header from './components/header';
import { Content } from "antd/lib/layout/layout";


export default function App() {

  return (
    <div>
      <Header></Header>
      <Content id="app-content">
        <Routes>
          <Route path="/listings/:id" element={<Listing />} />
          <Route path="/listings" element={<AllListings />} />
          <Route path="/" element={<AllListings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register2" element={<Register2 />} />
        </Routes>
      </Content>
    </div>
  );
}

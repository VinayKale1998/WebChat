// import React from "react"
import Header from "../components/Header";
// import {motion} from "framer-motion"
import { Outlet } from "react-router-dom";
export default function LoginPage({connected}) {
  return (
    <div>
      <Header connected={connected}></Header>
      <Outlet></Outlet>
    </div>
  );
}

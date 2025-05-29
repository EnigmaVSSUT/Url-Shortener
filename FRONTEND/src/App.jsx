import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/Navbar";

export default function UrlShortener() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

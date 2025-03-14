import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main aria-label="Main Content" className="flex-grow">
        <Hero />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

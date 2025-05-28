import type { ReactNode } from "react";
import Header from "./Header";
import { useLocation } from "react-router-dom";


interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

    const location = useLocation();
    const noHeaderRoutes = ["/loginpage", "/signup"];

    const showHeader = !noHeaderRoutes.includes(location.pathname)

  return (
    <div className={showHeader ? "pt-16" : ""}> {/* IMPORTANT, CREATES LAYOUT ISSUES ON LOGINPAGE OTHERWISE */}
      {showHeader && <Header />}
      {children}
    </div>
  );
}

"use client";
import { useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import ApiManager from "../api/apiManager";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const hideHeaderElements = pathname === "/";
  const hideSidebar = pathname === "/";
  const userID =
    typeof window !== "undefined" && window.localStorage
      ? localStorage.getItem("useridentifier") || ""
      : "";
  const userRole =
    typeof window !== "undefined" && window.localStorage
      ? localStorage.getItem("role") || ""
      : "";

  const handleLogout = () => {
    ApiManager.defaults.headers.common["Authorization"] = `Bearer  `;
    router.push("/");
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const navigateTo = (path) => {
    if (!hideSidebar) {
      setSidebarVisible(false);
      router.push(path);
    }
  };

  const navigateToHomepage = () => {
    const homepagePath =
      userRole === "ROLE_ADMIN" ? "/homepage-admin" : "/homepage-other";
    navigateTo(homepagePath);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1 onClick={toggleSidebar}>Issue Management</h1>
          <div className="header-right">
            {!hideHeaderElements && (
              <>
                <span>
                  {userID} / {userRole}
                </span>
                <button onClick={handleLogout}>Log out</button>
              </>
            )}
          </div>
        </header>
        {!hideSidebar && (
          <div className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
            <div className="sidebar-section">
              <ul>
                <li onClick={navigateToHomepage}>Homepage</li>
                <li onClick={() => navigateTo("/browse_project")}>Projects</li>
                {/* <li onClick={() => navigateTo("/browse_issue")}>Issues</li> */}
              </ul>
            </div>
            <div className="sidebar-section sidebar-section-lower">
              <ul>
                <li onClick={() => navigateTo("/analysis_issue")}>Analysis</li>
              </ul>
            </div>
          </div>
        )}
        <main
          className={sidebarVisible && !hideSidebar ? "sidebar-visible" : ""}
        >
          {children}
        </main>
      </body>
    </html>
  );
}

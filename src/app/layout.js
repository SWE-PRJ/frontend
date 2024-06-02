"use client";
import { useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const hideHeaderElements = pathname === "/create_account" || pathname === "/";
  const userID =
    typeof window !== "undefined" && window.localStorage
      ? localStorage.getItem("useridentifier") || ""
      : "";
  const userRole =
    typeof window !== "undefined" && window.localStorage
      ? localStorage.getItem("role") || ""
      : "";

  const handleLogout = () => {
    router.push("/");
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const navigateTo = (path) => {
    setSidebarVisible(false);
    router.push(path);
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
        <div className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
          <div className="sidebar-section">
            <ul>
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
        <main className={sidebarVisible ? "sidebar-visible" : ""}>
          {children}
        </main>
      </body>
    </html>
  );
}

"use client";
import { Provider } from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";

import { Inter } from "next/font/google";
import { store } from "@/store/store";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <body
        className={`${inter.className} h-screen bg-primaryDarkBg flex flex-col`}
      >
        <Header />
        <div className="flex flex-row h-full">
          <Sidebar />
          {children}
        </div>
      </body>
    </Provider>
  );
}

"use client";
import Link from "next/link";
//import { FiSearch } from "react-icons/fi"; // ไอคอนแว่นขยาย
import { useState } from "react";

export default function Header() {
  const [query, setQuery] = useState("");

  return (
    <header className="w-full bg-white shadow flex items-center justify-between px-6 py-3">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/PSU_Brand_Logo.svg/2560px-PSU_Brand_Logo.svg.png"
          alt="logo"
          className="h-16 w-auto flex-shrink-0 p-1 pr-1"
        />
        <h1 className="text-xl font-medium text-gray-700">
          ระบบบริหารจัดการผลงานตีพิมพ์
        </h1>
      </div>

      
      {/* Menu */}
      <nav className="flex items-center space-x-6 text-gray-700 font-medium">
        <Link href="/">HOME</Link>
        <Link href="/user">USER</Link>
        <Link href="/setting">SETTING</Link>
      </nav>

      {/* Profile */}
      <div>
        <img
          src="/images/placeholder.jpg"
          alt="profile"
          className="h-9 w-9 rounded-full border"
        />
      </div>
    </header>
  );
}

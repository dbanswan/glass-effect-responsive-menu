```
"use client"; -- remove this line if not using next.js
```;
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const ResponsiveNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.height = "auto";
    }
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/learning", label: "Learning" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
      document.body.style.height = "auto";
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
          isScrolled
            ? "bg-white bg-opacity-20 backdrop-blur-lg shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold">ai.dbanswan.com</span>
            </div>

            <div className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium hover:underline underline-offset-4"
                  prefetch={false}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md bg-gray-800 text-white"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-20 backdrop-blur-lg md:hidden overflow-y-auto">
          {/* Close button */}
          <button
            onClick={toggleMenu}
            className="fixed top-4 right-4 p-2 rounded-md bg-gray-800 text-white"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col items-center justify-center min-h-screen gap-8 py-20">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-2xl font-medium hover:underline underline-offset-4"
                prefetch={false}
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ResponsiveNav;

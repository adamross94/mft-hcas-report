import React, { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-md">
      <nav className="bg-[#003087]">
        <div className="max-w-screen-xl mx-auto px-11 py-15 flex items-center justify-between h-20">
          {/* Logo & Branding */}
          <div className="flex items-center">
            <img
              src="../nhs-medway-logo-full.svg"
              alt="Medway NHS"
              className="h-18 w-auto !opacity-100"
            />
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-4">
            <a
              href="#overview"
              className="px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-[#005EB8] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#005EB8]"
            >
              Overview
            </a>
            <a
              href="#cost"
              className="px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-[#005EB8] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#005EB8]"
            >
              Cost-of-Living
            </a>
            <a
              href="#patient-flow"
              className="px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-[#005EB8] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#005EB8]"
            >
              Patient Flow
            </a>
            <a
              href="#staff"
              className="px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-[#005EB8] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#005EB8]"
            >
              Staff Turnover
            </a>
            <a
              href="#decision-makers"
              className="px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-[#005EB8] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#005EB8]"
            >
              Decision Makers
            </a>
            <a
              href="#conclusion"
              className="px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-[#005EB8] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#005EB8]"
            >
              Conclusion
            </a>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#005EB8] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Nav (conditionally rendered) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#003087]" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#overview"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#005EB8] transition-colors duration-300"
            >
              Overview
            </a>
            <a
              href="#cost"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#005EB8] transition-colors duration-300"
            >
              Cost-of-Living
            </a>
            <a
              href="#patient-flow"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#005EB8] transition-colors duration-300"
            >
              Patient Flow
            </a>
            <a
              href="#staff"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#005EB8] transition-colors duration-300"
            >
              Staff Turnover
            </a>
            <a
              href="#decision-makers"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#005EB8] transition-colors duration-300"
            >
              Decision Makers
            </a>
            <a
              href="#conclusion"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#005EB8] transition-colors duration-300"
            >
              Conclusion
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

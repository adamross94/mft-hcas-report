import React, { useState } from "react";

const HeroSection = () => {
  const [showAuthor, setShowAuthor] = useState(false);

  const toggleAuthorInfo = () => setShowAuthor(!showAuthor);

  return (
    <section
      id="hero"
      className="relative bg-cover bg-center bg-no-repeat min-h-[420px] w-full flex items-start pt-10"
      style={{
        backgroundImage: 'url("https://i.imgur.com/Xvk75XC.png")',
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      ></div>

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto max-w-screen-xl px-6 w-full text-white" data-aos="fade-up">
        <div className="mt-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            A Data-Driven Analysis of Fringe Eligibility
          </h1>
          <p className="text-lg md:text-xl leading-relaxed mb-6 max-w-3xl">
            This comprehensive report examines cost-of-living metrics, patient inflows,
            and staffing challenges to determine if Medway qualifies for the 5% High
            Cost Area Supplement [1].
          </p>
        </div>

        {/* Button Row */}
        <div className="flex items-center space-x-4 mb-4">
          {/* Show Author Button */}
          <button
            onClick={toggleAuthorInfo}
            className="relative px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-md text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
          >
            <span>{showAuthor ? "Hide Author Details" : "Show Author Details"}</span>
            {/* Down Arrow Icon */}
            <svg
              className={`ml-2 h-4 w-4 transform transition-transform duration-300 ${
                showAuthor ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Faint Vertical Bar */}
          <span className="block w-px h-6 bg-white/40" />

          {/* Learn More Button */}
          <a
            href="#overview"
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-md text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Learn More
          </a>
        </div>

        {/* Author Details (Accordion Style) */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            showAuthor ? "max-h-80 mb-8" : "max-h-0 mb-0"
          }`}
        >
          <div className="p-4 bg-gray-100 text-gray-800 rounded-md max-w-sm">
            <p className="text-base leading-relaxed mb-1">
              <strong>Lead Authors:</strong> Dr. Jane Smith, Dr. A. Patel
            </p>
            <p className="text-base leading-relaxed mb-1">
              <strong>Affiliation:</strong> Medway NHS Research Group
            </p>
            <p className="text-base leading-relaxed">
              <strong>Contact:</strong>{" "}
              <a href="mailto:authors@medway.nhs.uk" className="text-blue-700 hover:underline">
                authors@medway.nhs.uk
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

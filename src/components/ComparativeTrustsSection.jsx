import React from "react";

// Sample data for trusts; replace with your actual data.
const trusts = [
  {
    name: "Dartford and Gravesham NHS Trust",
    description:
      "Serving Dartford, Gravesham & Swanley fringe area. (Example: Darent Valley Hospital, Dartford)",
    logo: "https://www.kallidus.com/wp-content/uploads/2023/11/DGT-Logo-transparent-with-the-new-NHS-blue.png",
  },
  {
    name: "Princess Alexandra Hospital NHS Trust",
    description:
      "Serving Harlow and Epping Forest fringe areas. (Hospital: Princess Alexandra Hospital, Harlow)",
    logo: "https://www.pah.nhs.uk/base-install/images/main-logo/og-logo.png",
  },
  {
    name: "Mid and South Essex NHS Foundation Trust",
    description:
      "Serving South Essex (Basildon, Brentwood, Wickford, Thurrock fringe areas). (Hospitals: Basildon University Hospital, etc.)",
    logo: "https://www.mse.nhs.uk/base-install/images/main-logo/company-logo.png",
  },
  {
    name: "West Hertfordshire Teaching Hospitals NHS Trust",
    description:
      "Serving Watford & Three Rivers, Dacorum, St Albans & Harpenden, Hertsmere – all fringe areas. (Hospitals: Watford General, Hemel Hempstead, St Albans City Hospital)",
    logo: "https://www.myplannedcare.nhs.uk/wp-content/uploads/2024/07/West-Hertfordshire-Copy.png",
  },
  {
    name: "East and North Hertfordshire NHS Trust",
    description:
      "Parts of its catchment (e.g., Royston & Buntingford) are fringe areas. (Some community sites may qualify)",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVeXmbfTg4lDAD8BPvYya1VFUyC52s7hOYDg&s",
  },
  {
    name: "Frimley Health NHS Foundation Trust",
    description:
      "Serving Bracknell Forest, Slough, Windsor & Maidenhead, and Surrey Heath & Woking fringe areas. (Hospitals: Wexham Park, Heatherwood, Frimley Park)",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzP10d8YFd61sX8ZjOK45Fl7mBRwscGz2FMQ&s",
  },
  // ... add more trusts as needed
];

const ComparativeTrustsSection = () => {
  return (
    <section
      id="comparative-trusts"
      data-aos="fade-up"
      className="bg-white rounded-lg shadow-lg p-10 my-10 mx-auto max-w-screen-xl"
    >
      <h2 data-aos="fade-up" className="text-3xl font-bold text-blue-800 mb-8">
        🏥 NHS Trusts Receiving the 5% Fringe HCAS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trusts.map((trust, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={`${100 * index}`}
            className="bg-gray-50 rounded-lg shadow-md overflow-hidden"
          >
            {/* Top Half: Trust Logo */}
            <div className="h-32 bg-white flex items-center justify-center">
              <img
                src={trust.logo}
                alt={`${trust.name} logo`}
                className="max-h-full max-w-full object-contain p-2"
              />
            </div>
            {/* Bottom Half: Trust Description */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                {trust.name}
              </h3>
              <p className="text-base text-gray-700">{trust.description}</p>
            </div>
          </div>
        ))}
      </div>
      <p
        data-aos="fade-up"
        data-aos-delay="300"
        className="text-sm text-gray-500 mt-6"
      >
        <strong>🗒️ Complete Fringe Area List:</strong> Qualifying areas include “Dartford, Gravesham &amp; Swanley, Basildon, Billericay, Brentwood &amp; Wickford, Epping Forest, Harlow, Thurrock, Dacorum, Hertsmere, Royston/Buntingford/Bishop’s Stortford, South East Hertfordshire, St Albans &amp; Harpenden, Watford &amp; Three Rivers, Welwyn &amp; Hatfield, Bracknell Forest, Slough, Windsor/Ascot/Maidenhead, Wokingham, East Elmbridge &amp; Mid Surrey, East Surrey, Guildford &amp; Waverley, North Surrey, [and] Surrey Heath &amp; Woking” (<a
          className="text-blue-600 hover:underline transition-colors duration-300"
          href="https://nuffieldtrust.org.uk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="bg-yellow-200 text-black font-semibold px-1 rounded">
            [2]
          </span>
        </a>).
      </p>
    </section>
  );
};

export default ComparativeTrustsSection;

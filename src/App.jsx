// App.jsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroSection from './components/HeroSection';
import PatientFlowSection from './components/PatientFlowSection'; 
import StaffTurnoverSection from './components/StaffTurnoverSection';
import ComparativeTrustsSection from './components/ComparativeTrustsSection';
import HousingCard from './components/HousingCard';
import RentalCard from './components/RentalCard';
import TransportCard from './components/TransportCard';
import GeneralLivingCard from './components/GeneralLivingCard';
import ComparisonTable from './components/ComparisonTable';
import Header from './components/HeaderComponent';


function App() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
    // Enable smooth scrolling for anchor links
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="App">
   <Header />

      {/* Main Content */}
      <main>

{/* Hero Section */}
<HeroSection />


       {/* Overview Section */}
       <section
  id="overview"
  data-aos="fade-up"
  className="mx-auto my-10 max-w-screen-xl"
>
  <div className="bg-[#f9f9f9] rounded-lg shadow-md p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    {/* Left Column: Text Content */}
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
      Making the Case for a 5% "Fringe" HCAS for Medway NHS Foundation Trust
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
      High Cost Area Supplements (HCAS) provide NHS staff in expensive regions with pay uplifts. Fringe zones, typically counties bordering Greater London, receive a 5% supplement on basic pay (capped at a set amount). Medway NHS Foundation Trust currently lies outside the fringe zone, but evidence indicates Medway aligns closely with existing fringe areas. This report highlights key metrics—cost of living, patient inflow, workforce stability, and policy processes—to support Medway's inclusion in the 5% fringe HCAS area.
        <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[2]</span>.
      </p>
      <a
        href="#cost"
        className="inline-block text-blue-700 font-semibold hover:underline transition-colors duration-300"
      >
        Find out more about Medway’s Fringe HCAS case
      </a>
    </div>

    {/* Right Column: Stock Photo */}
    <div className="flex justify-center">
      <img
        src="https://i.imgur.com/yYLWuN1.png"
        alt="Medway NHS Overview"
        className="w-full h-auto rounded-lg shadow-md object-cover"
      />
    </div>
  </div>
</section>



        {/* Cost-of-Living Analysis Section */}
        <section
  id="cost"
  className="bg-white rounded-lg shadow-lg p-10 my-10 mx-auto max-w-screen-xl"
>
  <h2 data-aos="fade-up" className="text-3xl font-bold text-blue-800 mb-8">
    Cost-of-Living: Medway vs. Fringe Areas
  </h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <HousingCard dataAosDelay="100" />
  <RentalCard dataAosDelay="200" />
  <TransportCard dataAosDelay="300" />
  <GeneralLivingCard dataAosDelay="400" />

    {/* Insight Card */}
    <div data-aos="fade-up" data-aos-delay="500" className="bg-gray-50 rounded-lg p-6 shadow-md lg:col-span-2 lg:col-span-1">
    <h3 className="text-xl font-semibold mb-2">🔍 Insight</h3>
  <p className="text-base text-gray-700">
    The data spanning <strong>Housing</strong>, <strong>Rent</strong>, <strong>Transport</strong>, and <strong>General Living Expenses</strong> demonstrates that Medway’s cost of living pressures closely mirror or even exceed those of recognized fringe areas.
  </p>

  <p className="text-base text-gray-700 mt-4">
    <strong>Housing:</strong> Year-on-year price growth for Medway (2.5%) is on par with Thurrock (2.6%) and not far behind Dartford (3.0%) or Gravesham (4.4%). 
    Although absolute house prices are lower than in some fringe locations, the growth rate underscores Medway’s upward cost trajectory.
  </p>

  <p className="text-base text-gray-700 mt-4">
    <strong>Rent:</strong> Medway’s average rent increased by 13.1%—surpassing Thurrock’s 7.8% and Gravesham’s 9.1%, and even edging past Dartford’s 11.2%. High rental costs reflect similar demand pressures and elevated living expenses typical of fringe zones.
  </p>

  <p className="text-base text-gray-700 mt-4">
    <strong>Transport:</strong> Annual season ticket prices from Gillingham (~£6,784) outstrip those from East Tilbury (~£3,724) and Dartford/Gravesend (~£6,124). 
    Coupled with pricier monthly passes, Medway commuters shoulder costs at least as high as many recognized fringe commuters—if not higher.
  </p>

  <p className="text-base text-gray-700 mt-4">
    <strong>Council Tax &amp; General Living:</strong> Band D council tax for Medway (~£2,009) nears or exceeds that of surrounding Kent/Essex authorities and is only marginally less than Dartford or Gravesham. Day-to-day expenses such as groceries and utilities are largely on par with the broader region, meaning the added burden of higher council tax and transport can be keenly felt.
  </p>

  <p className="text-base text-gray-700 mt-4">
    These combined indicators support Medway’s case for <strong>NHS High Cost Area Supplement (HCAS)</strong> inclusion at the 5% fringe rate. Despite some absolute cost differences, the rising trends for housing, substantial rent hikes, high rail fares, and noticeable council tax levels collectively mirror or surpass those of officially recognized fringe areas.
  </p>
    </div>
  </div>

 <ComparisonTable dataAosDelay="600" />

  <p data-aos="fade-up" data-aos-delay="800" className="mt-4 text-sm text-gray-500">
    Sources: Land Registry/ONS data for house prices <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[1]</span> (<a className="text-blue-600 hover:underline" href="https://www.kent.gov.uk" target="_blank" rel="noopener noreferrer">kent.gov.uk</a>), ONS/estimates for rents <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[5]</span>, Kent Online (rail fare <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[6]</span> - <a className="text-blue-600 hover:underline" href="https://kentonline.co.uk" target="_blank" rel="noopener noreferrer">kentonline.co.uk</a>). (Fringe areas chosen for proximity comparison.)
  </p>
</section>




        {/* Patient Flow Analysis Section */}
        <PatientFlowSection />



        {/* Staff Turnover & Retention Section */}
        <StaffTurnoverSection />

        {/* Key Decision-Makers Section */}
        <section
  id="decision-makers"
  data-aos="fade-up"
  className="bg-white rounded-lg shadow-lg p-10 my-10 mx-auto max-w-screen-xl"
>
  <h2 data-aos="fade-up" className="text-3xl font-bold text-blue-800 mb-8">
    Key Decision-Makers
  </h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Card 1: NHS Pay Review Body */}
    <div data-aos="fade-up" data-aos-delay="100" className="bg-gray-50 rounded-lg p-6 shadow">
      <h3 className="text-xl font-bold mb-2">🏛️ NHS Pay Review Body (NHSPRB)</h3>
      <p className="text-base text-gray-700">
        This independent body advises the government on NHS pay scales and allowances. According to the Department of Health, "It is open to the NHS Pay Review Body to make recommendations on the future geographic coverage of high-cost area supplements and on the value of such supplements." [1]
      </p>
    </div>
    
    {/* Card 2: NHS Staff Council */}
    <div data-aos="fade-up" data-aos-delay="200" className="bg-gray-50 rounded-lg p-6 shadow">
      <h3 className="text-xl font-bold mb-2">🤝 NHS Staff Council (Employers &amp; Unions)</h3>
      <p className="text-base text-gray-700">
        HCAS provisions form part of the national Agenda for Change terms and conditions and are "jointly agreed by employers and the NHS trade unions." [2]
      </p>
    </div>
    
    {/* Card 3: Local Employers/ICS */}
    <div data-aos="fade-up" data-aos-delay="300" className="bg-gray-50 rounded-lg p-6 shadow">
      <h3 className="text-xl font-bold mb-2">🏢 Local Employers/ICS and Staff Organisations</h3>
      <p className="text-base text-gray-700">
        NHS employers or staff organisations in a specified area can propose a supplement where none exists. This enables Medway NHS FT and its partners to gather evidence for fringe status. [3]
      </p>
    </div>
    
    {/* Card 4: Department of Health & Social Care */}
    <div data-aos="fade-up" data-aos-delay="400" className="bg-gray-50 rounded-lg p-6 shadow">
      <h3 className="text-xl font-bold mb-2">📜 Department of Health and Social Care (DHSC)</h3>
      <p className="text-base text-gray-700">
        The Secretary of State for Health signs off on changes to the Agenda for Change terms, relying on the Staff Council/PRB process. [4]
      </p>
    </div>
    
    {/* Card 5: Other Stakeholders */}
    <div data-aos="fade-up" data-aos-delay="500" className="bg-gray-50 rounded-lg p-6 shadow">
      <h3 className="text-xl font-bold mb-2">⚖️ Other Stakeholders</h3>
      <p className="text-base text-gray-700">
        NHS England/Improvement, regional pay bodies, and local MPs/councils can influence the debate on HCAS boundaries. [5]
      </p>
    </div>
  </div>
  
  {/* Insight Callout */}
  <div data-aos="fade-up" data-aos-delay="600" className="mt-8 p-4 bg-gray-100 rounded-lg border-l-4 border-blue-700">
    <p className="text-lg text-gray-700">
      <strong>🔍 Insight:</strong> Advancing Medway's case for fringe HCAS requires a coalition of local evidence and national advocacy, leveraging robust data on cost of living, recruitment, and retention challenges. [6]
    </p>
  </div>
</section>



        {/* Comparative Trusts Section */}
        <ComparativeTrustsSection />

{/* Conclusion Section */}
<section
  id="conclusion"
  data-aos="fade-up"
  className="bg-white rounded-lg shadow-lg p-10 my-10 mx-auto max-w-screen-xl"
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Left Column: Text Content */}
    <div>
      <h2 data-aos="fade-up" className="text-3xl font-bold text-blue-800 mb-6">
        💡 Conclusion – Strengthening Medway’s Case
      </h2>
      <p
        data-aos="fade-up"
        data-aos-delay="100"
        className="text-lg text-gray-700 leading-relaxed mb-6"
      >
        All evidence indicates that Medway has a strong case for fringe HCAS inclusion.
        Cost-of-living data shows that Medway staff face housing and transport costs
        comparable to those in fringe areas, while patient flow patterns tie Medway
        into the London fringe healthcare network. Furthermore, higher staff turnover
        and historical vacancy challenges underscore the cost of being outside the
        current HCAS boundary <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[3]</span>.
      </p>
      <p
        data-aos="fade-up"
        data-aos-delay="200"
        className="text-lg text-gray-700 leading-relaxed mb-6"
      >
        To move this forward, Medway’s leaders and staff representatives should compile
        these comparative insights—potentially through a business case or FOI-backed report—and
        engage with the NHS Pay Review Body and Staff Council. By emphasizing the inequity
        (where Medway’s nurses effectively subsidize high living costs without the corresponding
        supplement) and the benefits of improved retention for a population of approximately 425,000{" "}
        <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[4]</span>
        (<a
          className="text-blue-600 hover:underline transition-colors duration-300"
          href="https://ihpn.org.uk"
          target="_blank"
          rel="noopener noreferrer"
        >[4]</a>), they can present a persuasive argument. With robust data and support from
        key decision-makers, Medway NHS Foundation Trust could be considered for inclusion in
        the 5% fringe HCAS at the next policy review (<a
          className="text-blue-600 hover:underline transition-colors duration-300"
          href="https://questions-statements.parliament.uk"
          target="_blank"
          rel="noopener noreferrer"
        >[5]</a>).
      </p>
      <p
        data-aos="fade-up"
        data-aos-delay="300"
        className="text-xs text-gray-500"
      >
        Sources: NHS Agenda for Change Handbook &amp; HCAS zones <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[1]</span>, Kent Housing &amp; Land Registry data <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[2]</span>,
        ONS/local rent/expense reports, Kent &amp; Medway STP, democracy.kent.gov.uk, jobs.nhs.uk,
        sbs.nhs.uk, and Parliamentary Q&amp;A <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[3]</span>.
      </p>
    </div>

    {/* Right Column: Interactive Chart Placeholder */}
    <div
      data-aos="fade-up"
      data-aos-delay="400"
      className="flex items-center justify-center"
    >
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center shadow-md">
        <p className="text-gray-500">[Interactive Chart Placeholder]</p>
      </div>
    </div>
  </div>
</section>


      </main>

      {/* Footer */}
      <footer
  data-aos="fade-up"
  role="contentinfo"
  className="bg-[#003087] text-white py-6 px-4 mt-12"
>
  <div className="container mx-auto text-center">
    <p className="text-sm">&copy; 2025 Medway HCAS Research Report</p>
    <p className="text-xs mt-2">
      Built with <span className="font-bold">Tailwind CSS</span> and{" "}
      <span className="font-bold">React</span>
    </p>
    <a
      href="#references"
      className="mt-2 inline-block text-blue-200 hover:text-blue-100 underline text-xs"
    >
      View Sources &amp; References
    </a>
  </div>
</footer>


    </div>
  );
}

export default App;

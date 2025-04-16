import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PatientFlowSection = () => {
  const [activeTab, setActiveTab] = useState("flow");

  // Updated tab styling for NHS-like appearance
  const tabClass = (tab) => {
    const baseClasses =
      "px-4 py-2 text-sm font-semibold rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#005EB8] transition-colors duration-300";
    const activeClasses = "bg-[#005EB8] text-white";
    const inactiveClasses = "bg-[#f3f2f1] text-[#201f1e] hover:bg-[#E8EDEE]";

    return `${baseClasses} ${
      activeTab === tab ? activeClasses : inactiveClasses
    }`;
  };

  // Example data for the chart
  const chartData = {
    labels: ['Bexley (London)', 'Kent (Excl. Medway)', 'Medway', 'Other London'],
    datasets: [
      {
        label: 'Approximate Patient Volume',
        data: [250, 900, 1500, 100], // Dummy data
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Estimated Patient Flows by Region',
      },
    },
  };

  return (
    <section
      id="patient-flow"
      className="bg-white rounded-lg shadow-lg p-10 my-10 mx-auto max-w-screen-xl"
      data-aos="fade-up"
    >
      <h2 className="text-3xl font-bold text-blue-800 mb-6" data-aos="fade-up">
        London Patient Inflows and Service Catchment
      </h2>

      {/* Tabs */}
      <div className="flex items-center space-x-2 mb-6">
        <button
          className={tabClass("flow")}
          onClick={() => setActiveTab("flow")}
        >
          🚑 Cross-Boundary Patient Flows
        </button>
        <button
          className={tabClass("services")}
          onClick={() => setActiveTab("services")}
        >
          🏥 Specialist Services Repatriation
        </button>
        <button
          className={tabClass("elective")}
          onClick={() => setActiveTab("elective")}
        >
          🔬 Elective &amp; Tertiary Care
        </button>
        <button
          className={tabClass("data")}
          onClick={() => setActiveTab("data")}
        >
          📊 Data &amp; Analysis
        </button>
        <button
          className={tabClass("insight")}
          onClick={() => setActiveTab("insight")}
        >
          🔍 Insight
        </button>
      </div>

      {/* Tab Panels */}
      <div className="mt-4">
        {activeTab === "flow" && (
          <div data-aos="fade-up" className="text-lg text-gray-700 leading-relaxed">
            Although Medway is outside Greater London, there is evidence of patient flow
            across the London–Kent boundary, suggesting Medway FT partly serves a London-adjacent
            population. In NHS service planning, trusts on the fringes often treat patients
            from bordering London boroughs. For instance, 
            <strong> Dartford and Gravesham NHS Trust</strong> (a fringe trust at Dartford) 
            treats a portion of patients from the London Borough of Bexley 
            <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[1]</span> 
            (<a
              className="text-blue-600 hover:underline"
              href="https://democracy.kent.gov.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              democracy.kent.gov.uk
            </a>).
            This occurs in stroke care and other acute services – Bexley residents are routinely
            taken to Dartford’s Darent Valley Hospital (Kent) for emergency care
            <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[1]</span>.
            Such cross-boundary flows were explicitly acknowledged during Kent &amp; Medway
            stroke network planning, confirming “Darent Valley Hospital treats some patients
            from London (Bexley).”
          </div>
        )}

        {activeTab === "services" && (
          <div data-aos="fade-up" className="text-lg text-gray-700 leading-relaxed">
            For Medway Maritime Hospital, direct inflow from London is smaller (due to
            greater distance). However, Medway FT draws patients from West Kent and
            nearby areas that might otherwise utilize London hospitals. After service
            reconfigurations in outer southeast London (e.g., downgrades at Sidcup’s Queen
            Mary’s Hospital), some specialist workloads were “repatriated” to Kent.
            Dartford &amp; Gravesham Trust described “repatriation of patients from London
            to the trust including [services from] Queen Mary’s Sidcup” around 2013
            <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[2]</span>
            (<a
              className="text-blue-600 hover:underline"
              href="https://jobs.nhs.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              jobs.nhs.uk
            </a>
            ) – a trend also impacting Medway as services are organized across Kent.
          </div>
        )}

        {activeTab === "elective" && (
          <div data-aos="fade-up" className="text-lg text-gray-700 leading-relaxed">
            In elective care, Medway FT has become a regional center for certain specialties,
            attracting patients from a broad catchment area (including fringe zones).
            Medway, Dartford, and Maidstone trusts jointly run the <strong>West Kent Urology Cancer Centre</strong>
            based at Medway Hospital
            <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[3]</span> 
            (<a
              className="text-blue-600 hover:underline"
              href="https://jobs.nhs.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              jobs.nhs.uk
            </a>
            ). This arrangement means that some patients from Dartford/Gravesham (and even
            Bexley, London) travel to Medway for complex urological procedures. During
            COVID-19, Medway FT also participated in mutual aid efforts that saw “over a
            thousand patients from London and further afield” receive surgery in partner
            sites
            <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[4]</span>
            (<a
              className="text-blue-600 hover:underline"
              href="https://ihpn.org.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              ihpn.org.uk
            </a>
            ), reinforcing Medway’s role in a network serving London’s needs.
          </div>
        )}

        {activeTab === "data" && (
          <div data-aos="fade-up" className="text-lg text-gray-700 leading-relaxed space-y-4">
            <p>
              To quantify London-based inflows, one could examine hospital episode 
              statistics by patient postcode. Medway FT’s catchment is primarily Medway 
              and Swale (Kent)
              <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[4]</span>, 
              but a small percentage of activity may come from outer London postcodes 
              (e.g., DA postcodes in Bexley). An FOI request to Medway NHS FT or NHS Digital 
              could reveal the number of London-originating patients to Medway, thereby 
              illustrating the proportion of London inflows. 
            </p>

            {/* Example chart visualization */}
            <div className="bg-gray-100 rounded-lg p-4 shadow-md">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        )}

        {activeTab === "insight" && (
          <div data-aos="fade-up" className="text-lg text-gray-700 leading-relaxed">
            Medway FT is part of the wider London/Kent healthcare system. Nearby
            fringe trusts manage significant London patient flows
            <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[1]</span>,
            and Medway participates in regional specialist networks that include 
            London-border populations
            <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[2]</span>. 
            This context indicates that Medway’s workforce handles challenges similar to
            those of other fringe-area trusts, including serving a commuter-heavy population 
            in a costly region. Recognizing Medway as fringe-eligible acknowledges these 
            cross-boundary service patterns.
          </div>
        )}
      </div>
    </section>
  );
};

export default PatientFlowSection;

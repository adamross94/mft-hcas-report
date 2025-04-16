import React, { useState } from "react";
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

const StaffTurnoverSection = () => {
  // Simple state management for the accordion
  const [openAccordion, setOpenAccordion] = useState(null);
  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  // Example data for comparing turnover rates
  const turnoverData = {
    labels: ['Medway FT', 'Dartford & Gravesham', 'West Herts'],
    datasets: [
      {
        label: 'Nursing Turnover Rate (%)',
        data: [14, 11, 11], // Adjust to reflect your actual data
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const turnoverOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Comparison of Nursing Turnover Rates',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return (
    <section
      id="staff"
      data-aos="fade-up"
      className="bg-white rounded-lg shadow-lg p-10 my-10 mx-auto max-w-screen-xl"
    >
      <h2 className="text-3xl font-bold text-blue-800 mb-6" data-aos="fade-up">
        Staff Turnover &amp; Retention at Medway vs Fringe Trusts
      </h2>

      {/* 1. Stats Row */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {/* Turnover */}
        <div className="bg-[#f3f2f1] rounded-lg p-6 text-center shadow">
          <h3 className="text-3xl font-bold text-[#005EB8]">14%</h3>
          <p className="text-sm text-[#201f1e]">Nursing Turnover</p>
        </div>
        {/* Vacancy */}
        <div className="bg-[#f3f2f1] rounded-lg p-6 text-center shadow">
          <h3 className="text-3xl font-bold text-[#005EB8]">9%</h3>
          <p className="text-sm text-[#201f1e]">Nurse Vacancy Rate</p>
        </div>
        {/* Improvement */}
        <div className="bg-[#f3f2f1] rounded-lg p-6 text-center shadow">
          <h3 className="text-3xl font-bold text-[#005EB8]">34% → 9%</h3>
          <p className="text-sm text-[#201f1e]">Vacancy Improvement</p>
        </div>
      </div>

      {/* 2. Timeline for Vacancy Rate Improvement */}
      <div
        className="relative border-l border-gray-200 ml-4 mb-8"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {/* 2018 */}
        <div className="mb-8 ml-6">
          <span className="flex absolute -left-4 justify-center items-center w-8 h-8 bg-[#005EB8] rounded-full ring-4 ring-white">
            <span className="text-white font-bold text-sm">2018</span>
          </span>
          <h3 className="text-lg font-semibold text-blue-800">34% Vacancy</h3>
          <p className="text-base text-gray-700 leading-relaxed">
            Medway’s nurse vacancy rate soared to 34%.
          </p>
        </div>
        {/* 2020 */}
        <div className="mb-8 ml-6">
          <span className="flex absolute -left-4 justify-center items-center w-8 h-8 bg-[#005EB8] rounded-full ring-4 ring-white">
            <span className="text-white font-bold text-sm">2020</span>
          </span>
          <h3 className="text-lg font-semibold text-blue-800">9% Vacancy</h3>
          <p className="text-base text-gray-700 leading-relaxed">
            Through extensive recruitment drives (including international hiring),
            the rate was reduced to 9%.
          </p>
        </div>
      </div>

      {/* 3. Progress Bar (Showing Improvement) */}
      <div className="mb-8" data-aos="fade-up" data-aos-delay="300">
        <p className="text-sm text-gray-700">
          Nurse Vacancy Improvement from 34% to 9%
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
          <div
            className="bg-[#005EB8] h-3 rounded-full transition-all duration-500"
            style={{ width: "74%" }}
            // 74% is just an example: (34% - 9%) / 34% ≈ 74% improvement
          ></div>
        </div>
      </div>

      {/* 3b. Example Chart: Turnover Comparison */}
      <div className="bg-gray-100 rounded-lg p-4 shadow-md mb-8" data-aos="fade-up" data-aos-delay="350">
        <Bar data={turnoverData} options={turnoverOptions} />
      </div>

      {/* 4. Accordion for Subheadings */}
      <div className="space-y-4" data-aos="fade-up" data-aos-delay="400">
        {/* High Turnover */}
        <div className="border rounded-md">
          <button
            onClick={() => toggleAccordion("turnover")}
            className="w-full text-left px-4 py-2 bg-[#f3f2f1] hover:bg-[#E8EDEE] focus:outline-none focus:ring-2 focus:ring-[#005EB8]"
          >
            📊 High Turnover
          </button>
          {openAccordion === "turnover" && (
            <div className="px-4 py-3 text-gray-700">
              <p className="text-lg leading-relaxed">
                Workforce stability is a critical concern. Medway FT’s nursing staff
                turnover is about <strong>14% annually</strong>
                <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[1]</span>, 
                exceeding the typical 10–12% at comparable trusts
                <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[1]</span>. 
                By contrast, nearby fringe-area trusts like Dartford &amp; Gravesham 
                (~11%) and West Herts (10–12%) show lower turnover
                <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[2]</span>.
              </p>
            </div>
          )}
        </div>

        {/* Vacancy Rates */}
        <div className="border rounded-md">
          <button
            onClick={() => toggleAccordion("vacancy")}
            className="w-full text-left px-4 py-2 bg-[#f3f2f1] hover:bg-[#E8EDEE]"
          >
            📉 Vacancy Rates
          </button>
          {openAccordion === "vacancy" && (
            <div className="px-4 py-3 text-gray-700">
              <p className="text-lg leading-relaxed">
                Medway once faced a ~34% nurse vacancy rate, but managed to lower it to 9%
                through targeted initiatives
                <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[1]</span>. 
                While this is a major improvement, a 9% gap remains substantial in terms
                of staffing needs, underscoring the ongoing retention challenge in the
                Medway area.
              </p>
            </div>
          )}
        </div>

        {/* Competitive Pressure */}
        <div className="border rounded-md">
          <button
            onClick={() => toggleAccordion("pressure")}
            className="w-full text-left px-4 py-2 bg-[#f3f2f1] hover:bg-[#E8EDEE]"
          >
            💸 Competitive Pressure
          </button>
          {openAccordion === "pressure" && (
            <div className="px-4 py-3 text-gray-700">
              <p className="text-lg leading-relaxed">
                Many Medway-based staff have the option to work in or closer to London,
                where they receive higher pay (HCAS). A Band 5 nurse living near Gravesend
                may choose Darent Valley Hospital (with a 5% fringe supplement) or go to
                outer London (with a 15% supplement). This differential can fuel turnover
                at Medway FT
                <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[3]</span>.
              </p>
            </div>
          )}
        </div>

        {/* Retention Initiatives */}
        <div className="border rounded-md">
          <button
            onClick={() => toggleAccordion("retention")}
            className="w-full text-left px-4 py-2 bg-[#f3f2f1] hover:bg-[#E8EDEE]"
          >
            🤝 Retention Initiatives
          </button>
          {openAccordion === "retention" && (
            <div className="px-4 py-3 text-gray-700">
              <p className="text-lg leading-relaxed">
                Medway FT has worked on pre-empting resignations through analytics,
                recognizing “high levels of staff turnover...major challenge”
                <span className="bg-yellow-200 text-black font-semibold px-1 rounded">[1]</span>. 
                The trust has emphasized that while recruitment is vital, retention is
                essential to avoid a costly cycle of ongoing recruitment and agency reliance.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 5. Alert/Callout for Key Insight */}
      <div
        className="p-4 mt-8 text-sm text-[#201f1e] bg-[#f3f2f1] rounded-lg border-l-4 border-[#005EB8]"
        role="alert"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <strong>🔍 Insight:</strong> Medway’s workforce metrics align with
        fringe-area challenges, showing higher turnover (~14% vs ~11%) and historical
        vacancies. Including Medway in HCAS could improve pay competitiveness, reduce
        turnover, and stabilize staffing.
      </div>
    </section>
  );
};

export default StaffTurnoverSection;

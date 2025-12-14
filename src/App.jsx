// App.jsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// NHS styling (your file)
import './App.css';

import Header from './components/HeaderComponent';

// NEW components (add these)
import SectionShell from './components/ui/SectionShell';
import ExecutiveSummary from './components/ExecutiveSummary';
import ContextGoals from './components/ContextGoals';
import EvidenceAtGlanceTable from './components/EvidenceAtGlanceTable';
import ServiceCatchment from './components/ServiceCatchment';
import WorkforceImpact from './components/WorkforceImpact';
import PolicyPathway from './components/PolicyPathway';
import Outcomes from './components/Outcomes';
import Recommendations from './components/Recommendations';
import SourcesAndMethods from './components/SourcesAndMethods';

// Keep the 4 metric cards but use them once
import HousingCard from './components/HousingCard';
import RentalCard from './components/RentalCard';
import TransportCard from './components/TransportCard';
import GeneralLivingCard from './components/GeneralLivingCard';
import InsightCallout from './components/InsightCallout';
import CostHighlights from './components/CostHighlights';

function App() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-in-out', once: true });
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="App">
      <Header />

      <main className="mx-auto max-w-screen-xl">
        {/* 1) Executive Summary */}
        <section id="executive-summary" className="my-10" data-aos="fade-up">
          <ExecutiveSummary />
        </section>

        {/* 2) Context & Goals */}
        <section id="context-goals" className="my-10" data-aos="fade-up">
          <ContextGoals />
        </section>

       {/* 3) Cost-of-Living metrics (merged cards) + single Insight */}
<SectionShell
  id="cost"
  title="Cost-of-Living: Medway vs. Fringe Areas"
  subtitle="Standardised periods & units; single insight, no duplicate narratives."
>
  {/* Single grid: each card now contains its KPI + narrative + chart */}
  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <HousingCard />
    <RentalCard />
    <TransportCard />
    <GeneralLivingCard />
  </div>

  <div className="mt-6">
    <InsightCallout />
  </div>
</SectionShell>


        {/* 4) Evidence At-a-Glance (single table) */}
        <SectionShell id="evidence">
  <EvidenceAtGlanceTable />
</SectionShell>

{/* Service Catchment + Workforce (side-by-side on ≥md) */}
<section id="service-and-workforce" className="my-10">
  <div className="mx-auto max-w-screen-xl space-y-6">
    <ServiceCatchment compact />

    <WorkforceImpact compact />
  </div>
</section>




        {/* 7) Policy Route (concise) */}
        <section id="policy" className="my-10" data-aos="fade-up">
          <PolicyPathway />
        </section>

        {/* 8) Outcomes */}
        <section id="outcomes" className="my-10" data-aos="fade-up">
          <Outcomes />
        </section>

        {/* 9) Recommendations & Next Steps */}
        <section id="recommendations" className="my-10" data-aos="fade-up">
          <Recommendations />
        </section>

        {/* 10) Sources & Methods */}
        <SectionShell id="sources">
  <SourcesAndMethods />
</SectionShell>
      </main>
    </div>
  );
}

export default App;

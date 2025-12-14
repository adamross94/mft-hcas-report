// src/components/CostMetricHeader.jsx

export function CostMetricHeader({ icon, label, value, detail }) {
    return (
      <header className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {icon && (
            <span aria-hidden="true" className="mr-1">
              {icon}
            </span>
          )}
          {label}
        </p>
        <p className="mt-1 text-2xl font-extrabold text-[#005EB8]">
          {value}
        </p>
        <p className="mt-1 text-sm text-slate-600">
          {detail}
        </p>
      </header>
    );
  }
  
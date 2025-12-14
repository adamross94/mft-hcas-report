// src/data/evidence.js

// 1) Period metadata (structured instead of bare strings)
export const PERIOD = {
  HPI: {
    id: 'HPI',
    short: 'Dec 2024',
    label: 'to Dec-2024',
  },
  RENT_YOY: {
    id: 'RENT_YOY',
    short: 'Jan 2025 vs Jan 2024',
    label: 'Jan-2025 vs Jan-2024',
  },
  FARES_2025: {
    id: 'FARES_2025',
    short: '2025 standard annual',
    label: 'Checked 2025 standard annual',
  },
  COUNCIL_TAX_2324: {
    id: 'COUNCIL_TAX_2324',
    short: '2023/24',
    label: '2023/24',
  },
  WORKFORCE_12M: {
    id: 'WORKFORCE_12M',
    short: 'Latest 12m',
    label: 'Most recent 12 months',
  },
};

// Simple helper so we can reuse the same fringe set in copy if needed
export const COMPARATOR_AREAS = ['Dartford', 'Gravesham', 'Thurrock'];

// 2) Core evidence items in a structured, numeric-friendly shape
//    - key: stable ID for React keys, routing, etc.
//    - group: 'cost' | 'workforce' | 'supporting'
//    - severity: 'high' | 'medium' | 'low' | 'improving'
//    - medway: numeric values + units + periodKey
//    - comparators: array of { area, value, note? }
//    - why: one-line explanation you already had

export const EVIDENCE_ITEMS = [
  {
    key: 'house-prices-yoy',
    group: 'cost',
    severity: 'medium',
    domain: 'House prices (YoY)',
    medway: {
      type: 'percent',
      value: 2.5,
      labelPrefix: '+', // becomes "+2.5%"
      periodKey: 'HPI',
      trend: 'up',
    },
    comparators: [
      { area: 'Thurrock', value: 2.6 },
      { area: 'Dartford', value: 3.0 },
      { area: 'Gravesham', value: 4.4 },
    ],
    why: 'Market trend aligns with fringe areas → comparable pressure.',
  },

  {
    key: 'private-rent-yoy-level',
    group: 'cost',
    severity: 'high',
    domain: 'Private rent (YoY / level)',
    medway: {
      type: 'mixed', // YoY + level
      yoy: 13.1,
      level: 1165,
      currency: 'GBP',
      yoyLabelPrefix: '+',
      periodKey: 'RENT_YOY',
      trend: 'up',
    },
    comparators: [
      { area: 'Thurrock', value: 7.8 },
      { area: 'Dartford', value: 11.2 },
      { area: 'Gravesham', value: 9.1 },
    ],
    why: 'Faster rent growth erodes net pay; recruitment/retention risk.',
  },

  {
    key: 'rail-season-ticket',
    group: 'cost',
    severity: 'high',
    domain: 'Rail season ticket (annual)',
    medway: {
      type: 'currency',
      value: 6784,
      currency: 'GBP',
      route: 'Gillingham→London',
      periodKey: 'FARES_2025',
      trend: 'up',
    },
    comparators: [
      { area: 'Dartford/Gravesend', value: 6124 },
      { area: 'East Tilbury', value: 3724 },
    ],
    why: 'Commuting costs meet/exceed many fringe routes.',
  },

  {
    key: 'council-tax-band-d',
    group: 'cost',
    severity: 'medium',
    domain: 'Council Tax (Band D)',
    medway: {
      type: 'currency',
      value: 2008.56,
      currency: 'GBP',
      periodKey: 'COUNCIL_TAX_2324',
      trend: 'up',
    },
    comparators: [
      { area: 'Thurrock', value: 1898.91 },
      { area: 'Dartford', value: 2077.98 },
      { area: 'Gravesham', value: 2103.76 },
    ],
    why: 'Fixed local costs add to affordability pressure.',
  },

  {
    key: 'nurse-turnover',
    group: 'workforce',
    severity: 'high',
    domain: 'Nurse turnover (annual)',
    medway: {
      type: 'percent',
      value: 14,
      approx: true, // displays "~14%"
      periodKey: 'WORKFORCE_12M',
      trend: 'up',
    },
    comparators: [
      { area: 'Nearby fringe trusts', value: 11, approxRange: '10–12%' },
    ],
    why: 'Pay differential incentivises moves to fringe/outer-London.',
  },

  {
    key: 'nurse-vacancy-trend',
    group: 'workforce',
    severity: 'improving',
    domain: 'Nurse vacancy (trend)',
    medway: {
      type: 'rangePercent',
      from: 34,
      to: 9,
      trend: 'down',
    },
    comparators: [],
    why: 'Gains fragile without competitive allowance.',
  },
];

// 3) Formatter helpers to keep EvidenceAtGlanceTable’s current string API working
//    You can import EVIDENCE_ROWS as before, and optionally also use EVIDENCE_ITEMS
//    directly anywhere you want real numbers.

function formatPercent(value, { plus = false, approx = false } = {}) {
  if (value == null) return '';
  const n = Number(value);
  const prefix = plus && n > 0 ? '+' : '';
  const approxMark = approx ? '~' : '';
  const text = `${prefix}${n.toFixed(1).replace(/\.0$/, '')}%`;
  return `${approxMark}${text}`;
}

function formatCurrency(value, currency = 'GBP') {
  if (value == null) return '';
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

function getPeriodLabel(periodKey) {
  if (!periodKey) return null;
  const meta = PERIOD[periodKey];
  return meta ? meta.label : null;
}

function formatMedwayForTable(item) {
  const m = item.medway || {};
  const periodLabel = getPeriodLabel(m.periodKey);

  if (m.type === 'percent') {
    const main = formatPercent(m.value, {
      plus: true,
      approx: m.approx,
    });
    return periodLabel ? `${main} (${periodLabel})` : main;
  }

  if (m.type === 'mixed') {
    const yoy = formatPercent(m.yoy, { plus: true });
    const level = formatCurrency(m.level, m.currency);
    const main = `${yoy} to ${level}`;
    return periodLabel ? `${main} (${periodLabel})` : main;
  }

  if (m.type === 'currency') {
    const value = formatCurrency(m.value, m.currency);
    const routePart = m.route ? `${m.route}; ` : '';
    const periodPart = periodLabel ? periodLabel : '';
    return `${value} (${routePart}${periodPart})`;
  }

  if (m.type === 'rangePercent') {
    const from = formatPercent(m.from);
    const to = formatPercent(m.to);
    return `${from} → ${to}`;
  }

  // Fallback
  return '';
}

function formatComparatorsForTable(item) {
  if (!item.comparators || item.comparators.length === 0) {
    return '—';
  }

  // For percentages, we want "+2.6%" style; for currency, "£2,008.56"
  const first = item.comparators[0] || {};
  const medwayType = item.medway?.type;

  const parts = item.comparators.map((c) => {
    let val;
    if (medwayType === 'percent' || medwayType === 'mixed' || medwayType === 'rangePercent') {
      if (typeof c.approxRange === 'string') {
        val = c.approxRange; // e.g. "10–12%"
      } else {
        val = formatPercent(c.value, { plus: medwayType !== 'rangePercent' });
      }
    } else {
      val = formatCurrency(c.value);
    }
    return `${c.area} ${val}`;
  });

  return parts.join('; ');
}

// 4) Backwards-compatible flat rows for the existing table
//    Includes key + severity so you can start using them in EvidenceAtGlanceTable.

export const EVIDENCE_ROWS = EVIDENCE_ITEMS.map((item) => ({
  key: item.key,
  domain: item.domain,
  severity: item.severity,
  medway: formatMedwayForTable(item),
  comparators: formatComparatorsForTable(item),
  why: item.why,
}));

// 5) Sources and verify steps (your originals, slightly keyed for reuse)

export const SOURCES = [
  {
    key: 'HPI',
    tag: 'HPI',
    label:
      'ONS / Land Registry — UK House Price Index (Medway, Dartford, Gravesham, Thurrock)',
    url: 'https://www.gov.uk/government/collections/uk-house-price-index-reports',
    type: 'Cost',
  },
  {
    key: 'Rent',
    tag: 'Rent',
    label: 'ONS Private Rental Market statistics',
    url: 'https://www.ons.gov.uk',
    type: 'Cost',
  },
  {
    key: 'Rail',
    tag: 'Rail',
    label: 'Southeastern & c2c season ticket fares; Kent Online coverage',
    url: 'https://www.southeasternrailway.co.uk',
    type: 'Cost',
  },
  {
    key: 'CouncilTax',
    tag: 'CouncilTax',
    label: 'Local authority Band D schedules; local.gov.uk',
    url: 'https://www.local.gov.uk',
    type: 'Cost',
  },
  {
    key: 'Workforce',
    tag: 'Workforce',
    label: 'Trust board papers / ESR workforce KPIs (Medway, DGT, etc.)',
    url: '',
    type: 'Workforce',
  },
  {
    key: 'Policy',
    tag: 'Policy',
    label: 'NHS Agenda for Change Handbook; NHSPRB reports; DHSC statements',
    url: 'https://www.nhsemployers.org',
    type: 'Policy',
  },
];

export const VERIFY_STEPS = [
  {
    key: 'house-prices',
    domain: 'House prices',
    steps: [
      'Download LA series for Medway, Dartford, Gravesham, Thurrock',
      'Compute YoY = (t - t-12) / t-12',
      `Match period ${PERIOD.HPI.label}`,
    ],
  },
  {
    key: 'private-rent',
    domain: 'Private rent',
    steps: [
      'Use ONS PRMS median monthly rent',
      'Compute Jan-2025 vs Jan-2024 YoY',
      'State property mix if used',
    ],
  },
  {
    key: 'rail-fares',
    domain: 'Rail fares',
    steps: [
      'Quote standard annual season only',
      'Record fare code/date',
      'Flag HS1 vs classic products',
    ],
  },
  {
    key: 'council-tax',
    domain: 'Council Tax',
    steps: [
      'Use 2023/24 Band D for each LA',
      'Note parish/precept if applicable',
    ],
  },
  {
    key: 'workforce',
    domain: 'Workforce',
    steps: [
      'Use same definitions for vacancy/turnover across trusts',
      '12-month window; ESR metric notes',
    ],
  },
  {
    key: 'catchment',
    domain: 'Catchment',
    steps: [
      'HES/SUS by postcode share',
      'Stroke/UEC planning docs for cross-boundary flows',
    ],
  },
];

import { useMemo, useState } from 'react';
import { BarChart3, Download, IndianRupee, TrendingUp, Users } from 'lucide-react';
import './HiringAnalytics.css';

const monthlyRevenue = [42, 55, 48, 68, 74, 88, 96, 113, 121, 134, 151, 168];
const plans = [
  { name: 'Starter', price: '₹4,999', detail: 'For early campus campaigns', features: ['2 active roles', '5 college partners', 'Basic reports'] },
  { name: 'Growth', price: '₹14,999', detail: 'For growing hiring teams', features: ['10 active roles', '25 college partners', 'Recruiter AI and reports'] },
  { name: 'Enterprise', price: 'Custom', detail: 'For large-scale hiring', features: ['Unlimited roles', 'Unlimited college partners', 'Custom workflows and support'] },
];

export function RevenuePricing() {
  const [selectedPlan, setSelectedPlan] = useState('Growth');
  const max = Math.max(...monthlyRevenue);
  return <section className="analytics-page"><div className="analytics-heading"><div><p className="eyebrow">COMMERCIAL OVERVIEW</p><h2>Revenue & pricing</h2><p>Track hiring-platform growth and manage your current plan.</p></div><span className="revenue-badge"><TrendingUp size={15} /> +18.4% this month</span></div><div className="revenue-summary"><article><span>Monthly recurring revenue</span><b><IndianRupee size={20} />1,68,000</b><small>₹26,000 more than last month</small></article><article><span>Paid hiring teams</span><b>48</b><small>6 new this month</small></article><article><span>Revenue per team</span><b>₹3,500</b><small>Average monthly value</small></article></div><article className="revenue-chart-card"><div><h3>Monthly revenue</h3><p>Revenue in thousands of rupees</p></div><div className="revenue-chart">{monthlyRevenue.map((value, index) => <div key={index}><i style={{ height: `${(value / max) * 100}%` }} title={`₹${value}k`} /><span>{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}</span></div>)}</div></article><div className="pricing-heading"><div><h3>Choose a hiring plan</h3><p>Change plans as your campus hiring program grows.</p></div><span>Current plan: <b>{selectedPlan}</b></span></div><div className="pricing-grid">{plans.map((plan) => <article className={`pricing-card ${selectedPlan === plan.name ? 'selected' : ''}`} key={plan.name}><h3>{plan.name}</h3><p>{plan.detail}</p><b>{plan.price}<small>{plan.price !== 'Custom' && ' / month'}</small></b><ul>{plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul><button className="button" onClick={() => setSelectedPlan(plan.name)}>{selectedPlan === plan.name ? 'Current plan' : plan.name === 'Enterprise' ? 'Contact sales' : 'Choose plan'}</button></article>)}</div></section>;
}

export function HiringReports() {
  const [range, setRange] = useState('Last 30 days');
  const reportRows = useMemo(() => [['Applications received', '1,284'], ['Candidates shortlisted', '326'], ['Interviews completed', '118'], ['Offers accepted', '43'], ['Average time to hire', '18 days']], []);
  const exportReport = () => {
    const csv = ['Metric,Value', ...reportRows.map(([metric, value]) => `${metric},${value}`)].join('\n');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    link.download = 'grindup-hiring-report.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  };
  return <section className="analytics-page"><div className="analytics-heading"><div><p className="eyebrow">HIRING INTELLIGENCE</p><h2>Hiring reports</h2><p>Understand your campus funnel and hiring outcomes.</p></div><div className="report-actions"><select value={range} onChange={(event) => setRange(event.target.value)}><option>Last 30 days</option><option>Last quarter</option><option>This year</option></select><button className="button" onClick={exportReport}><Download size={14} /> Export CSV</button></div></div><div className="report-kpis"><article><Users size={19} /><b>1,284</b><span>Candidates reached</span><small>+22% vs previous period</small></article><article><BarChart3 size={19} /><b>34%</b><span>Shortlist rate</span><small>Above target by 4%</small></article><article><TrendingUp size={19} /><b>43</b><span>Offers accepted</span><small>+9 this month</small></article></div><div className="report-grid"><article className="funnel-report"><h3>Recruitment funnel</h3>{[['Applied', 1284], ['Shortlisted', 326], ['Interviewed', 118], ['Hired', 43]].map(([label, value], index) => <div className="funnel-step" key={String(label)}><span>{label}</span><i style={{ width: `${100 - index * 20}%` }} /><b>{value}</b></div>)}</article><article className="report-table"><h3>Summary · {range}</h3>{reportRows.map(([metric, value]) => <div key={metric}><span>{metric}</span><b>{value}</b></div>)}</article></div><article className="insight-card"><TrendingUp size={20} /><div><b>Recruiter insight</b><p>Your strongest candidate flow is from Bengaluru and Pune partner colleges. Add one more technical interview slot to reduce time-to-hire.</p></div></article></section>;
}

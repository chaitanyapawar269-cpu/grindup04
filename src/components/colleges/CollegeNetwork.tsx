import { useMemo, useState } from 'react';
import { Building2, MapPin, Search, Users } from 'lucide-react';
import { colleges } from './collegeData';
import './CollegeNetwork.css';

export default function CollegeNetwork() {
  const [search, setSearch] = useState('');
  const [state, setState] = useState('All states');
  const [partners, setPartners] = useState<number[]>([]);
  const states = ['All states', ...new Set(colleges.map((college) => college.state))];
  const visible = useMemo(() => colleges.filter((college) => (state === 'All states' || college.state === state) && `${college.name} ${college.city} ${college.programs.join(' ')}`.toLowerCase().includes(search.toLowerCase())), [search, state]);

  return <section className="college-page">
    <div className="college-hero"><div><p className="eyebrow">CAMPUS HIRING NETWORK</p><h2>Connect with student talent.</h2><p>Discover verified campus partners and build your next early-career hiring pipeline.</p></div><div className="college-stats"><article><b>{colleges.length}+</b><span>Colleges</span></article><article><b>150k+</b><span>Students</span></article><article><b>{partners.length}</b><span>Saved partners</span></article></div></div>
    <div className="college-tools"><label><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search college, city or program" /></label><select value={state} onChange={(event) => setState(event.target.value)}>{states.map((item) => <option key={item}>{item}</option>)}</select></div>
    <p className="college-result">Showing {visible.length} colleges</p>
    <div className="college-grid">{visible.map((college) => <article className="college-card" key={college.id}><div className="college-card-top"><span className="college-mark"><Building2 size={20} /></span><button className={partners.includes(college.id) ? 'partnered' : ''} onClick={() => setPartners((current) => current.includes(college.id) ? current.filter((id) => id !== college.id) : [...current, college.id])}>{partners.includes(college.id) ? 'Saved' : 'Save partner'}</button></div><h3>{college.name}</h3><p><MapPin size={14} /> {college.city}, {college.state}</p><p><Users size={14} /> {college.students.toLocaleString()} placement-ready students</p><div>{college.programs.map((program) => <span key={program}>{program}</span>)}</div></article>)}</div>
  </section>;
}

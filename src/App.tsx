import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  BriefcaseBusiness,
  Check,
  Compass,
  Eye,
  EyeOff,
  GraduationCap,
  IndianRupee,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Mail,
  MapPin,
  Moon,
  Plus,
  Search,
  Send,
  Sun,
  UserRound,
} from 'lucide-react';
import OpportunitiesPage from './pages/Home.jsx';
import CollegeNetwork from './components/colleges/CollegeNetwork';
import { HiringReports, RevenuePricing } from './components/analytics/HiringAnalytics';
import StudentJourney from './components/student/StudentJourney';
import ProfileBuilder from './components/student/ProfileBuilder';

type Page = 'Dashboard' | 'Discover' | 'Student Journey' | 'Applications' | 'College Network' | 'Revenue & Pricing' | 'Hiring Reports' | 'Profile' | 'Recruiter AI' | 'Opportunities';

const nav: { icon: typeof LayoutDashboard; label: Page }[] = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Compass, label: 'Discover' },
  { icon: GraduationCap, label: 'Student Journey' },
  { icon: BriefcaseBusiness, label: 'Applications' },
  { icon: BriefcaseBusiness, label: 'College Network' },
  { icon: IndianRupee, label: 'Revenue & Pricing' },
  { icon: BarChart3, label: 'Hiring Reports' },
  { icon: UserRound, label: 'Profile' },
  { icon: Bot, label: 'Recruiter AI' },
  { icon: BriefcaseBusiness, label: 'Opportunities' },
];

const applications = [
  { company: 'BrightLabs', role: 'Frontend Developer', location: 'Bengaluru', status: 'Interview', date: 'Today' },
  { company: 'Northstar', role: 'Junior Product Designer', location: 'Remote', status: 'Screening', date: 'Yesterday' },
  { company: 'Cloudpoint', role: 'Software Engineer', location: 'Pune', status: 'Applied', date: 'Aug 8' },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('grindup-theme') === 'dark');
  const [showPassword, setShowPassword] = useState(false);
  const [page, setPage] = useState<Page>('Dashboard');
  const [applicationSearch, setApplicationSearch] = useState('');
  const [profileComplete, setProfileComplete] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I can help you find roles, improve your profile, or prepare for interviews.' },
  ]);
  const [prompt, setPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    localStorage.setItem('grindup-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const visibleApplications = useMemo(() => {
    const search = applicationSearch.trim().toLowerCase();
    return applications.filter((application) =>
      !search || Object.values(application).some((value) => value.toLowerCase().includes(search)),
    );
  }, [applicationSearch]);

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();
    const question = prompt.trim();
    if (!question) return;
    const answer = /college|campus|student/i.test(question)
      ? 'I can help you source from 56 campus partners. Open College Network to filter by city, state, and programs, then save colleges for your hiring campaign.'
      : /interview|shortlist|candidate/i.test(question)
        ? 'Start with skills, project work, graduation year, and availability. I can help you create a shortlist and interview questions for the role.'
        : /job|role|hire|developer|designer/i.test(question)
          ? 'For early-career hiring, define required skills, graduation year, location, and compensation. Then publish the role to matched college partners.'
          : 'I can help plan campus hiring, write a job description, build a shortlist, or prepare interviews. Tell me the role and the skills you need.';
    setMessages((current) => [...current, { role: 'user', text: question }]);
    setPrompt('');
    setIsThinking(true);
    try {
      const response = await fetch('/api/recruiter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: question }) });
      const data = await response.json();
      setMessages((current) => [...current, { role: 'assistant', text: response.ok ? data.text : answer }]);
    } catch {
      setMessages((current) => [...current, { role: 'assistant', text: answer }]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleAuthentication = (event: FormEvent) => {
    event.preventDefault();
    setIsAuthenticated(true);
    setPage('Dashboard');
  };

  if (!isAuthenticated) {
    return (
      <div className="login-page">
        <section className="login-panel">
          <div className="login-logo">Grind<span>Up</span></div>
          <div className="login-copy">
            <p className="eyebrow">CAREERS, MADE SIMPLE</p>
            <h1>Find work that moves you forward.</h1>
            <p>Discover opportunities, keep applications organized, and get practical career guidance in one place.</p>
          </div>
          <div className="login-pulse"><div><b><i className="pulse-dot" />New opportunities every day</b><small>Build a profile recruiters can find.</small></div><BriefcaseBusiness size={20} /></div>
          <p className="login-credit">© 2026 GrindUp. Build your next move.</p>
        </section>
        <section className="login-form-wrap">
          <form className="login-form" onSubmit={handleAuthentication}>
            <div className="form-heading"><p className="eyebrow">{isSignUp ? 'CREATE ACCOUNT' : 'WELCOME BACK'}</p><h2>{isSignUp ? 'Start your journey' : 'Sign in to GrindUp'}</h2><p>{isSignUp ? 'Create a free account to begin finding opportunities.' : 'Enter your details to continue to your workspace.'}</p></div>
            {isSignUp && <><label htmlFor="name">Full name</label><div className="input-wrap"><UserRound size={16} /><input id="name" required placeholder="Your name" /></div></>}
            <label htmlFor="email">Email address</label>
            <div className="input-wrap"><Mail size={16} /><input id="email" type="email" required placeholder="you@example.com" /></div>
            <label htmlFor="password">Password</label>
            <div className="input-wrap"><LockKeyhole size={16} /><input id="password" type={showPassword ? 'text' : 'password'} required minLength={6} placeholder="At least 6 characters" /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>
            {!isSignUp && <div className="form-options"><label className="remember"><input type="checkbox" /> Remember me</label><button type="button">Forgot password?</button></div>}
            <button className="login-button" type="submit">{isSignUp ? 'Create account' : 'Sign in'} <ArrowRight size={15} /></button>
            <div className="login-divider">OR</div>
            <button className="google-button" type="button" onClick={() => setIsAuthenticated(true)}><b>G</b> Continue with Google</button>
            <p className="signup-copy">{isSignUp ? 'Already have an account?' : "Don't have an account?"} <button type="button" onClick={() => setIsSignUp((value) => !value)}>{isSignUp ? 'Sign in' : 'Create one'}</button></p>
          </form>
        </section>
      </div>
    );
  }

  return (
    <div className={`app-shell ${isDark ? 'dark' : ''}`}>
      <aside className="sidebar">
        <div className="logo">Grind<span>Up</span></div>
        <div className="workspace-label">
          <span className="avatar">CP</span>
          <div><b>Career workspace</b><small>Candidate account</small></div>
        </div>
        <nav aria-label="Main navigation">
          {nav.map(({ icon: Icon, label }) => (
            <button key={label} onClick={() => setPage(label)} className={page === label ? 'active' : ''}>
              <Icon size={18} /><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="sidebar-theme" onClick={() => setIsDark((value) => !value)}>{isDark ? <Sun size={18} /> : <Moon size={18} />}<span>{isDark ? 'Light mode' : 'Dark mode'}</span></button>
          <button className="sidebar-theme logout-button" onClick={() => setIsAuthenticated(false)}><LogOut size={18} /><span>Log out</span></button>
        </div>
      </aside>

      <main className="content">
        {page !== 'Opportunities' && (
          <header className="topbar">
            <div><p className="breadcrumb">GrindUp / {page}</p><h1>{page}</h1></div>
            <div className="top-actions"><button className="icon-button" onClick={() => setIsDark((value) => !value)} aria-label="Toggle dark mode">{isDark ? <Sun size={16} /> : <Moon size={16} />}</button><button className="icon-button" aria-label="Notifications"><Bell size={16} /><i /></button><button className="avatar avatar-small" onClick={() => setIsAuthenticated(false)} aria-label="Log out">CP</button></div>
          </header>
        )}

        {page === 'Dashboard' && (
          <section className="overview">
            <div>
              <p className="eyebrow">YOUR CAREER AT A GLANCE</p>
              <h2>Welcome back!</h2>
              <p className="intro">Track applications, discover relevant roles, and keep your profile ready for recruiters.</p>
              <div className="metric-grid">
                <article className="metric"><b>12</b><p>Applications</p><small>+3 this week</small></article>
                <article className="metric"><b>4</b><p>Interviews</p><small>2 upcoming</small></article>
                <article className="metric"><b>86%</b><p>Profile score</p><small>Looking great</small></article>
              </div>
              <div className="section-title section-space"><h2>Recommended for you</h2><button className="text-button" onClick={() => setPage('Opportunities')}>Browse all <ArrowRight size={13} /></button></div>
              <div className="candidate-grid">
                {['Frontend Developer', 'Data Analyst', 'UI/UX Designer'].map((role, index) => <article className="candidate-card card" key={role}><span className="candidate-avatar blue">{['BL', 'NP', 'SD'][index]}</span><h3>{role}</h3><p>{['BrightLabs · Bengaluru', 'Northstar · Remote', 'Studio Design · Mumbai'][index]}</p><div className="skill-list"><i>Entry level</i><i>Full time</i></div><button className="text-button" onClick={() => setPage('Opportunities')}>View opportunity <ArrowRight size={13} /></button></article>)}
              </div>
            </div>
            <aside className="goal-card"><p className="eyebrow">PROFILE GOAL</p><b>Complete your profile</b><div className="goal-progress"><i style={{ width: profileComplete ? '100%' : '68%' }} /></div><p>{profileComplete ? 'All set — recruiters can find you.' : 'Add your skills to reach 100%.'}</p><button className="text-button" onClick={() => { setProfileComplete(true); setPage('Profile'); }}>Finish profile <ArrowRight size={13} /></button></aside>
          </section>
        )}

        {page === 'Student Journey' && <StudentJourney />}

        {page === 'Discover' && <ProfileBuilder />}

        {page === 'Applications' && <section><div className="page-actions"><div><h2>Your applications <span>{applications.length}</span></h2><p>Keep track of every job you have applied for.</p></div><div><button className="button" onClick={() => setPage('Opportunities')}><Plus size={14} /> Find opportunities</button></div></div><div className="table-card"><div className="table-toolbar"><label className="search-box"><Search size={14} /><input value={applicationSearch} onChange={(event) => setApplicationSearch(event.target.value)} placeholder="Search applications" /></label></div>{visibleApplications.map((item) => <article className="table-row" key={item.company}><div className="candidate-name"><span className="candidate-avatar mint">{item.company.slice(0, 2)}</span><div><b>{item.role}</b><small>{item.company}</small></div></div><span><MapPin size={12} /> {item.location}</span><span className={`badge ${item.status.toLowerCase()}`}>{item.status}</span><b>{item.date}</b></article>)}{visibleApplications.length === 0 && <div className="empty-state"><Search className="empty-icon" /><h2>No applications found</h2><p>Try another search term or explore new opportunities.</p></div>}</div></section>}

        {page === 'College Network' && <CollegeNetwork />}

        {page === 'Revenue & Pricing' && <RevenuePricing />}

        {page === 'Hiring Reports' && <HiringReports />}

        {page === 'Profile' && <section className="profile-layout" style={{ paddingTop: 29 }}><article className="profile-hero card"><span className="profile-big-avatar">CP</span><div><h2>Chaitanya Pawar</h2><p>Open to work · India</p></div><button className="button" onClick={() => setProfileComplete(true)}><Check size={14} /> Save profile</button></article><article className="completion-card card"><div className="completion-ring"><b>{profileComplete ? '100%' : '68%'}</b></div><div><h2>Profile completion</h2><p>{profileComplete ? 'Your profile is ready to share.' : 'Add your key skills and preferred location.'}</p><button className="text-button" onClick={() => setProfileComplete(true)}>Complete now <ArrowRight size={13} /></button></div></article><article className="card preference-card"><p className="eyebrow">JOB PREFERENCES</p><h3>Frontend & software roles</h3><p>Open to remote and hybrid roles in India.</p><button className="button button-secondary" onClick={() => setPage('Opportunities')}>Explore matches</button></article></section>}

        {page === 'Recruiter AI' && <section><div className="page-actions"><div><h2>Recruiter AI</h2><p>Get practical help with your next career move.</p></div></div><div className="ai-layout"><aside><div className="ai-icon"><Bot size={18} /></div><h3>Your career assistant</h3><p>Ask about roles, skills, applications, or interviews.</p><button onClick={() => setPrompt('Help me find a role')}>Find matching roles <ArrowRight size={12} /></button><button onClick={() => setPrompt('How can I improve my profile?')}>Improve my profile <ArrowRight size={12} /></button></aside><div className="ai-chat"><div className="chat-header"><div><b>Career assistant</b><small><i /> {isThinking ? 'Thinking…' : 'Online'}</small></div></div><div className="chat-messages">{messages.map((message, index) => <article key={index} className={`message ${message.role === 'user' ? 'user' : ''}`}>{message.role === 'assistant' && <span className="ai-icon small"><Bot size={13} /></span>}<p>{message.text}</p></article>)}</div><form className="chat-input" onSubmit={sendMessage}><input value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Ask anything about your career..." /><button disabled={isThinking} aria-label="Send message"><Send size={15} /></button></form></div></div></section>}

        {page === 'Opportunities' && <OpportunitiesPage />}
      </main>
    </div>
  );
}

export default App;

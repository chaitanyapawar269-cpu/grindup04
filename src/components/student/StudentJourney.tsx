import { useState } from 'react';
import { ArrowRight, CheckCircle2, FileText, Lock, PlayCircle, ShieldCheck, Sparkles, Target } from 'lucide-react';
import './StudentJourney.css';

const stages = [
  ['Discover', 'Explore roles, colleges, and career pathways.'], ['Register — ₹29', 'Create your GrindUp student account.'], ['Build profile', 'Add education, skills, projects, and preferences.'], ['Verify profile', 'Confirm your student details and identity.'], ['Career & market assessment', 'Understand strengths and current demand.'], ['Employability score', 'See a clear, measurable readiness score.'], ['Skill gap analysis', 'Identify the skills to build next.'], ['Personalized job-readiness plan', 'Follow your weekly action plan.'], ['Resume + profile optimization', 'Improve your resume and public profile.'], ['AI mock interview / assessment', 'Practice with role-specific feedback.'], ['Job matching', 'Receive opportunities that fit your profile.'], ['Application + commitment', 'Apply and confirm your availability.'], ['Interview preparation', 'Prepare answers, projects, and documents.'], ['Interview', 'Attend your employer interview.'], ['Offer', 'Review and accept your offer.'], ['Joining', 'Start your new role with confidence.'], ['Placement record + career profile', 'Keep a verified record of your achievement.'],
];

const stageIcons = [Sparkles, Target, FileText, ShieldCheck, Target, Sparkles, Target, FileText, FileText, PlayCircle, Target, CheckCircle2, FileText, PlayCircle, CheckCircle2, CheckCircle2, ShieldCheck];

export default function StudentJourney() {
  const [completed, setCompleted] = useState(0);
  const [registered, setRegistered] = useState(false);
  const active = Math.min(completed, stages.length - 1);
  const [title, description] = stages[active];
  const Icon = stageIcons[active];
  const completeCurrent = () => {
    if (active === 1 && !registered) setRegistered(true);
    setCompleted((value) => Math.min(value + 1, stages.length - 1));
  };

  return <section className="journey-page">
    <div className="journey-hero"><div><p className="eyebrow">STUDENT CAREER JOURNEY</p><h2>From discovery to placement.</h2><p>One guided pathway to become job-ready, get matched, and build a verified career record.</p></div><div className="journey-score"><span>Career progress</span><b>{Math.round((completed / (stages.length - 1)) * 100)}%</b><i><em style={{ width: `${(completed / (stages.length - 1)) * 100}%` }} /></i></div></div>
    <div className="journey-layout"><aside className="journey-steps" aria-label="Student journey stages">{stages.map(([name], index) => { const StepIcon = stageIcons[index]; const isDone = index < completed || (index === 1 && registered); const isActive = index === active; return <button className={`${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`} key={name} onClick={() => index <= completed && setCompleted(index)}><span>{isDone ? <CheckCircle2 size={17} /> : index > completed ? <Lock size={14} /> : <StepIcon size={17} />}</span><div><small>STEP {index + 1}</small><b>{name}</b></div></button>; })}</aside>
      <main className="journey-card"><div className="journey-card-icon"><Icon size={27} /></div><p className="eyebrow">STEP {active + 1} OF {stages.length}</p><h3>{title}</h3><p>{description}</p>{active === 1 && !registered ? <div className="registration-box"><div><b>Student registration</b><span>One-time platform fee</span></div><strong>₹29</strong></div> : <div className="journey-checklist"><span><CheckCircle2 size={16} /> Guided support at every step</span><span><CheckCircle2 size={16} /> Your progress is saved securely</span></div>}<button className="button journey-action" onClick={completeCurrent}>{active === 1 && !registered ? 'Pay ₹29 & register' : active === stages.length - 1 ? 'View placement record' : `Complete ${title}`} <ArrowRight size={15} /></button>{active > 0 && <button className="text-button journey-back" onClick={() => setCompleted((value) => Math.max(0, value - 1))}>Back to previous step</button>}</main></div>
  </section>;
}

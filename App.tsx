import React, { useState } from 'react';
import { MovieInput, PredictionResult } from './types';
import { predictMovieSuccess } from './services/geminiService';
import { Input, TextArea } from './components/Input';
import { ResultDashboard } from './components/ResultDashboard';
import { Auth } from './components/Auth';
import { Clapperboard, Film, Users, User, DollarSign, Text, Zap, Loader2, LogOut, ArrowRight, Activity } from 'lucide-react';

const INITIAL_FORM: MovieInput = {
  title: '',
  director: '',
  actors: '',
  genre: '',
  budget: '',
  synopsis: ''
};

const App: React.FC = () => {
  // Authentication State
  const [user, setUser] = useState<string | null>(null);
  const [registeredEmails, setRegisteredEmails] = useState<Set<string>>(new Set());

  // Application State
  const [form, setForm] = useState<MovieInput>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePredict = async () => {
    if (!form.title || !form.synopsis) {
        setError("Missing critical data points. Title and Synopsis required.");
        return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const data = await predictMovieSuccess(form);
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Prediction algorithm failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setForm(INITIAL_FORM);
    setError(null);
  };

  const handleLogin = (username: string) => {
    setUser(username);
  };

  const handleRegister = (email: string) => {
    setRegisteredEmails(prev => new Set(prev).add(email));
  };

  const handleLogout = () => {
    setUser(null);
    handleReset();
  };

  // Access Control: Redirect to Auth if not logged in
  if (!user) {
    return (
      <Auth 
        onLogin={handleLogin} 
        onRegister={handleRegister} 
        registeredEmails={registeredEmails} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-200 pb-20 font-sans selection:bg-red-600/30 relative overflow-x-hidden">
      
      {/* Cinematic Background Layer */}
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-black via-slate-950/90 to-black pointer-events-none"></div>
      
      {/* Header */}
      <header className="border-b border-red-900/20 bg-black/80 backdrop-blur-xl sticky top-0 z-50 relative">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-red-700 rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(185,28,28,0.4)]">
                <Clapperboard className="text-white" size={20} />
             </div>
             <div className="flex flex-col">
                <h1 className="font-bold text-2xl tracking-tighter text-white font-['Oswald'] leading-none">PREMO</h1>
                <span className="text-[10px] uppercase tracking-[0.3em] text-red-600 font-bold">Intelligence</span>
             </div>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-500 bg-black/40 px-4 py-2 border border-slate-800">
                <Activity size={12} className="text-red-600" />
                SYSTEM ONLINE
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)] ml-1"></div>
             </div>
             
             <div className="flex items-center gap-4 pl-6 border-l border-slate-800">
                <div className="text-right hidden sm:block">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Logged In As</p>
                    <p className="text-sm font-bold text-white uppercase tracking-wider">{user}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2.5 hover:bg-red-900/20 rounded-full text-slate-400 hover:text-red-500 transition-colors border border-transparent hover:border-red-900/50"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {result ? (
          <ResultDashboard result={result} onReset={handleReset} />
        ) : (
          <div className="max-w-4xl mx-auto animate-fade-in">
             <div className="mb-12 text-center">
                <h2 className="text-5xl font-bold text-white mb-4 tracking-tighter font-['Oswald'] uppercase">Project Analytics</h2>
                <div className="h-1 w-24 bg-red-700 mx-auto shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
                <p className="text-slate-400 mt-6 text-lg font-light tracking-wide max-w-xl mx-auto">
                    Input script parameters to initialize the predictive success model.
                </p>
             </div>

             <div className="bg-slate-950/80 p-8 md:p-10 border border-slate-800 backdrop-blur-sm shadow-2xl relative">
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-red-600"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-red-600"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-red-600"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-red-600"></div>

                {error && (
                   <div className="mb-8 bg-red-950/30 border border-red-900/50 text-red-400 px-6 py-4 text-xs font-mono flex items-center gap-3">
                      <Zap size={16} />
                      <span className="uppercase tracking-wider">Error: {error}</span>
                   </div>
                )}

                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Input 
                      label="Project Title" 
                      name="title" 
                      placeholder="ENTER TITLE" 
                      value={form.title} 
                      onChange={handleInputChange}
                      icon={<Film size={14}/>}
                    />
                    <Input 
                      label="Genre" 
                      name="genre" 
                      placeholder="ENTER GENRE" 
                      value={form.genre} 
                      onChange={handleInputChange}
                      icon={<Zap size={14}/>}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Input 
                      label="Director" 
                      name="director" 
                      placeholder="DIRECTOR NAME" 
                      value={form.director} 
                      onChange={handleInputChange}
                      icon={<User size={14}/>}
                    />
                    <Input 
                      label="Est. Budget" 
                      name="budget" 
                      placeholder="$ USD" 
                      value={form.budget} 
                      onChange={handleInputChange}
                      icon={<DollarSign size={14}/>}
                    />
                  </div>

                  <Input 
                    label="Key Cast" 
                    name="actors" 
                    placeholder="LIST MAIN ACTORS" 
                    value={form.actors} 
                    onChange={handleInputChange}
                    icon={<Users size={14}/>}
                  />

                  <TextArea 
                    label="Synopsis / Logline" 
                    name="synopsis" 
                    placeholder="ENTER PLOT SUMMARY..." 
                    value={form.synopsis} 
                    onChange={handleInputChange}
                    icon={<Text size={14}/>}
                  />

                  <div className="pt-6">
                    <button 
                      onClick={handlePredict}
                      disabled={loading}
                      className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-5 px-6 transition-all duration-300 shadow-[0_0_20px_rgba(185,28,28,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group border border-red-800 uppercase tracking-widest text-sm"
                    >
                      {loading ? (
                        <>
                           <Loader2 className="animate-spin" />
                           PROCESSING DATA...
                        </>
                      ) : (
                        <>
                           INITIATE ANALYSIS
                           <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
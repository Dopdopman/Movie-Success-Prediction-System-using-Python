import React from 'react';
import { PredictionResult } from '../types';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle, Target, DollarSign, Film } from 'lucide-react';

interface ResultDashboardProps {
  result: PredictionResult;
  onReset: () => void;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({ result, onReset }) => {
  // Cinematic Red Palette
  const primaryColor = '#dc2626'; // Red-600
  
  const data = [{ name: 'Score', value: result.successScore, fill: primaryColor }];

  return (
    <div className="animate-fade-in space-y-8 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-red-900/30 pb-6">
        <div>
          <h2 className="text-4xl font-bold text-white tracking-tighter font-['Oswald'] uppercase">Analysis Complete</h2>
          <div className="flex items-center gap-2 mt-1">
             <div className="h-1 w-1 bg-red-600 rounded-full animate-pulse"></div>
             <p className="text-slate-500 font-mono text-xs tracking-widest">PROJECTION_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>
        </div>
        <button 
          onClick={onReset}
          className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors border border-slate-800 hover:border-red-600 px-6 py-3 rounded-none hover:bg-red-950/30"
        >
          New Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Score Card - Hero */}
        <div className="lg:col-span-1 bg-slate-950/80 rounded-none p-8 border border-red-900/20 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 to-transparent opacity-50" />
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-900 to-transparent opacity-50"></div>
          
          <h3 className="text-red-600 text-[10px] font-bold uppercase tracking-[0.3em] z-10 mb-4">Success Probability</h3>
          
          <div className="h-56 w-full z-10 relative flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                innerRadius="75%" 
                outerRadius="100%" 
                barSize={8} 
                data={data} 
                startAngle={180} 
                endAngle={0}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar
                  label={false}
                  background={{ fill: '#1e293b' }}
                  dataKey="value"
                  cornerRadius={0}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
               <span className="text-6xl font-bold text-white tracking-tighter font-['Oswald']">{result.successScore}<span className="text-2xl text-red-600">%</span></span>
               <span className="text-red-500 font-mono text-sm uppercase tracking-widest mt-1 border px-2 py-0.5 border-red-900/50 rounded-full bg-red-950/30">{result.successLevel}</span>
            </div>
          </div>
        </div>

        {/* Box Office & Audience */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Estimated Box Office */}
          <div className="bg-slate-950/80 p-6 border border-red-900/20 flex flex-col gap-4 relative overflow-hidden">
             <div className="absolute right-0 top-0 p-3 opacity-10">
                <DollarSign size={64} className="text-red-500" />
             </div>
             <div className="flex items-center gap-2 text-red-500 mb-1">
                <DollarSign size={18} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Est. Box Office</span>
             </div>
             <p className="text-3xl font-['Oswald'] font-bold text-white tracking-tight z-10">{result.estimatedBoxOffice}</p>
             <div className="h-0.5 w-full bg-slate-800 mt-auto overflow-hidden">
                <div className="h-full bg-red-600 w-3/4 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
             </div>
          </div>

          {/* Target Audience */}
          <div className="bg-slate-950/80 p-6 border border-red-900/20 flex flex-col gap-4 relative">
             <div className="flex items-center gap-2 text-red-500 mb-1">
                <Target size={18} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Target Audience</span>
             </div>
             <p className="text-sm text-slate-300 leading-relaxed font-light">{result.targetAudience}</p>
          </div>

           {/* Comparable Titles */}
           <div className="col-span-1 md:col-span-2 bg-slate-950/80 p-6 border border-red-900/20">
             <div className="flex items-center gap-2 text-white mb-4">
                <Film size={18} className="text-red-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Comparable Titles</span>
             </div>
             <div className="flex flex-wrap gap-3">
                {result.comparableMovies.map((movie, idx) => (
                  <span key={idx} className="px-4 py-2 bg-black text-slate-300 text-xs font-mono uppercase tracking-wide border border-slate-800 border-l-2 border-l-red-800">
                    {movie}
                  </span>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* AI Reasoning */}
      <div className="bg-slate-950/80 p-8 border border-red-900/20 relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-red-900/50"></div>
        <h3 className="text-red-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">AI Analysis Log</h3>
        <p className="text-slate-200 leading-relaxed font-light text-lg tracking-wide opacity-90">
          "{result.reasoning}"
        </p>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Risks */}
        <div className="bg-slate-950/50 p-6 border border-red-900/30">
          <div className="flex items-center gap-2 text-red-500 mb-6 border-b border-red-900/30 pb-2">
            <AlertTriangle size={18} />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Risk Factors</h3>
          </div>
          <ul className="space-y-4">
            {result.weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                <span className="text-red-600 font-bold text-xs mt-0.5">✕</span>
                {w}
              </li>
            ))}
          </ul>
        </div>

        {/* Strengths */}
        <div className="bg-slate-950/50 p-6 border border-slate-800">
          <div className="flex items-center gap-2 text-white mb-6 border-b border-slate-800 pb-2">
            <CheckCircle size={18} />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Market Strengths</h3>
          </div>
          <ul className="space-y-4">
            {result.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                 <span className="text-white font-bold text-xs mt-0.5">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
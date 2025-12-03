import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, icon, className, ...props }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 font-sans group-focus-within:text-red-500 transition-colors">
        {icon}
        {label}
      </label>
      <div className="relative group">
        <input
          {...props}
          className="w-full bg-slate-950/50 border-b border-slate-800 text-slate-100 px-0 py-3 focus:outline-none focus:border-red-600 transition-all placeholder-slate-700 font-sans text-base focus:bg-slate-900/50"
        />
        {/* Animated underline effect */}
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-500 group-focus-within:w-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
      </div>
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  icon?: React.ReactNode;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, icon, className, ...props }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 font-sans group-focus-within:text-red-500 transition-colors">
        {icon}
        {label}
      </label>
      <div className="relative group">
        <textarea
          {...props}
          className="w-full bg-slate-950/50 border border-slate-800 text-slate-100 px-4 py-3 rounded-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-900/20 transition-all placeholder-slate-700 font-sans text-base min-h-[120px] focus:bg-slate-900/50"
        />
      </div>
    </div>
  );
};
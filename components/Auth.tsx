import React, { useState } from 'react';
import { Input } from './Input';
import { Film, AlertCircle, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

interface AuthProps {
  onLogin: (username: string) => void;
  onRegister: (email: string) => void;
  registeredEmails: Set<string>;
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onRegister, registeredEmails }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on type
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    // Forgot Password Flow
    if (forgotPassword) {
      if (!formData.email) {
        setError('Please enter your email to reset credentials.');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setSuccessMsg('Reset link dispatched to secure channel.');
        setTimeout(() => {
            setSuccessMsg('');
            setForgotPassword(false);
        }, 3000);
      }, 1500);
      return;
    }

    // Validation
    if (!formData.email || !formData.password) {
      setError('Credentials incomplete.');
      return;
    }

    if (isSignUp && !formData.name) {
      setError('Identity confirmation required (Name).');
      return;
    }

    setIsLoading(true);

    // Simulate Network Request
    setTimeout(() => {
      setIsLoading(false);

      if (isSignUp) {
        // Registration Logic
        if (registeredEmails.has(formData.email)) {
          setError('Identity already registered. Proceed to login.');
          setTimeout(() => setIsSignUp(false), 1500);
          return;
        }
        
        onRegister(formData.email);
        onLogin(formData.name || formData.email.split('@')[0]);
      } else {
        // Login Logic
        if (!registeredEmails.has(formData.email)) {
          setError('Account not found. Initiating registration protocol...');
          // Auto-redirect to Registration
          setTimeout(() => {
            setIsSignUp(true);
            setError('');
          }, 1500);
          return;
        }

        // Simple password check mock
        if (formData.password.length < 6) {
             setError('Invalid security key (Password too short).');
             return;
        }

        const name = formData.email.split('@')[0]; // Simple name extraction if not stored
        onLogin(name);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950/90 to-black"></div>
        
        {/* Scanlines Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}></div>

        <div className="w-full max-w-md bg-slate-950/80 backdrop-blur-xl border border-slate-800 p-8 md:p-12 shadow-2xl relative z-10 cinematic-shadow flex flex-col gap-8">
            
            {/* Header */}
            <div className="text-center relative">
                 <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-600/20 blur-[60px] rounded-full pointer-events-none"></div>
                 <div className="inline-flex items-center justify-center w-14 h-14 mb-6 border border-slate-800 bg-slate-900/50 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                    <Film size={28} className="text-red-600" />
                 </div>
                 <h1 className="text-5xl font-bold text-white tracking-tighter font-['Oswald'] mb-2">PREMO</h1>
                 <div className="h-0.5 w-16 bg-red-600 mx-auto shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
                 <p className="text-slate-500 text-xs font-mono mt-4 uppercase tracking-[0.3em]">
                    {forgotPassword ? 'Credential Recovery' : (isSignUp ? 'New User Registration' : 'Secure System Login')}
                 </p>
            </div>

            {/* Notifications */}
            {error && (
                <div className="bg-red-950/30 border border-red-900/50 text-red-400 px-4 py-3 rounded text-xs font-mono flex items-center gap-3 animate-pulse">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}
             {successMsg && (
                <div className="bg-green-950/30 border border-green-900/50 text-green-400 px-4 py-3 rounded text-xs font-mono flex items-center gap-3">
                    <CheckCircle2 size={16} />
                    {successMsg}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                {isSignUp && (
                    <div className="animate-fade-in">
                        <Input 
                            label="CODENAME" 
                            name="name" 
                            placeholder="Enter your alias"
                            value={formData.name}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                )}
                
                <Input 
                    label="EMAIL FREQUENCY" 
                    name="email" 
                    type="email"
                    placeholder="user@premo.ai"
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                />

                {!forgotPassword && (
                    <Input 
                        label="PASSWORD" 
                        name="password" 
                        type="password" 
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        autoComplete={isSignUp ? "new-password" : "current-password"}
                    />
                )}

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-4 px-6 mt-4 transition-all duration-300 shadow-[0_0_20px_rgba(185,28,28,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group tracking-widest uppercase text-sm border border-red-800"
                >
                    {isLoading ? (
                        <Loader2 className="animate-spin text-white" size={20} />
                    ) : (
                        <>
                            {forgotPassword ? 'TRANSMIT RESET LINK' : (isSignUp ? 'INITIATE REGISTRATION' : 'LOG IN')}
                            {!forgotPassword && <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />}
                        </>
                    )}
                </button>
            </form>

            {/* Footer Actions */}
            <div className="flex flex-col gap-3 text-center pt-2 border-t border-slate-900">
                {!forgotPassword && (
                    <button 
                        type="button"
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-slate-500 hover:text-red-500 text-xs tracking-widest uppercase transition-colors"
                    >
                        {isSignUp ? "Already have an ID? Login" : "No Access ID? Register"}
                    </button>
                )}
                
                <button 
                    type="button"
                    onClick={() => {
                        setForgotPassword(!forgotPassword);
                        setError('');
                        setSuccessMsg('');
                    }}
                    className="text-slate-600 hover:text-slate-400 text-[10px] font-mono transition-colors"
                >
                    {forgotPassword ? "Return to Login" : "Forgot Password?"}
                </button>
            </div>
        </div>

        {/* Footer Version */}
        <div className="absolute bottom-6 text-slate-700 text-[10px] font-mono tracking-widest opacity-50">
            PREMO SYSTEM v2.5.0 // SECURE CONNECTION
        </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { UserState, Transaction } from '../types';
import { ArrowLeft, CheckCircle, Search, ScanLine, Loader2, IndianRupee } from 'lucide-react';

interface SendMoneyProps {
  user: UserState;
  onTransactionComplete: (amount: number, payee: string, note: string) => void;
  onBack: () => void;
}

const SendMoney: React.FC<SendMoneyProps> = ({ user, onTransactionComplete, onBack }) => {
  const [step, setStep] = useState<'input' | 'amount' | 'processing' | 'success'>('input');
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [verifiedName, setVerifiedName] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Simulate UPI Verification
  const handleVerify = () => {
    if (!upiId.includes('@')) {
      setError("Invalid UPI ID format. Must contain '@'.");
      return;
    }
    setError('');
    setIsVerifying(true);
    
    // Fake API delay
    setTimeout(() => {
      setIsVerifying(false);
      const mockNames = ['Starbucks', 'Uber India', 'Zomato', 'John Doe', 'Alice Wonderland'];
      setVerifiedName(mockNames[Math.floor(Math.random() * mockNames.length)]);
      setStep('amount');
    }, 1500);
  };

  const handlePay = () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (amt > user.balance) {
      setError("Insufficient balance.");
      return;
    }

    setStep('processing');
    
    setTimeout(() => {
      onTransactionComplete(amt, verifiedName || upiId, note);
      setStep('success');
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-white rounded-3xl p-6 text-center animate-in fade-in duration-500">
        <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Payment Successful!</h2>
        <p className="text-slate-500 mb-6">You successfully sent ₹{amount} to {verifiedName}.</p>
        <button 
          onClick={onBack}
          className="bg-indigo-600 text-white w-full py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
        >
          Done
        </button>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] p-6 text-center">
        <Loader2 size={48} className="text-indigo-600 animate-spin mb-4" />
        <h3 className="text-xl font-semibold text-slate-800">Processing Payment...</h3>
        <p className="text-slate-500 mt-2">Do not close this window.</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[80vh] rounded-t-3xl shadow-sm p-4 relative">
       {/* Header */}
      <div className="flex items-center gap-3 mb-6 pt-2">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <h2 className="text-lg font-semibold text-slate-800">Send Money</h2>
      </div>

      {step === 'input' && (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">To UPI ID / Number</label>
            <div className="flex items-center gap-2">
              <Search size={20} className="text-slate-400" />
              <input 
                type="text" 
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="example@bank" 
                className="bg-transparent w-full outline-none text-slate-800 font-medium placeholder:text-slate-300"
              />
            </div>
          </div>
          
          {error && <p className="text-red-500 text-sm flex items-center gap-1"><span className="block w-1.5 h-1.5 rounded-full bg-red-500"></span>{error}</p>}

          <button 
            onClick={handleVerify}
            disabled={!upiId || isVerifying}
            className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${!upiId ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'}`}
          >
            {isVerifying ? <Loader2 className="animate-spin" /> : 'Verify & Proceed'}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">Or scan QR code</span>
            </div>
          </div>

          <button className="w-full border-2 border-dashed border-indigo-200 py-4 rounded-xl flex flex-col items-center justify-center gap-2 text-indigo-600 hover:bg-indigo-50 transition-colors">
            <ScanLine size={24} />
            <span className="font-medium">Open Scanner</span>
          </button>
        </div>
      )}

      {step === 'amount' && (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
           <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
             <div className="h-10 w-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                {verifiedName?.charAt(0)}
             </div>
             <div>
               <p className="text-xs text-indigo-600 font-medium">Paying to</p>
               <p className="font-bold text-indigo-900">{verifiedName}</p>
               <p className="text-xs text-indigo-400">{upiId}</p>
             </div>
           </div>

           <div className="text-center py-6">
             <label className="text-slate-500 text-sm font-medium mb-2 block">Enter Amount</label>
             <div className="flex items-center justify-center gap-1">
               <IndianRupee size={32} className="text-slate-800" />
               <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  autoFocus
                  className="text-5xl font-bold text-slate-800 w-40 text-center outline-none placeholder:text-slate-200"
               />
             </div>
           </div>

           <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <input 
                type="text" 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note (optional)" 
                className="bg-transparent w-full outline-none text-sm text-slate-700 placeholder:text-slate-400"
              />
           </div>

           {error && <p className="text-red-500 text-sm text-center">{error}</p>}

           <button 
            onClick={handlePay}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl"
          >
            Pay ₹{amount || '0'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SendMoney;

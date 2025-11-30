import React from 'react';
import { UserState } from '../types';
import { ArrowLeft, Share2, Copy, Download } from 'lucide-react';

interface ReceiveMoneyProps {
  user: UserState;
  onBack: () => void;
}

const ReceiveMoney: React.FC<ReceiveMoneyProps> = ({ user, onBack }) => {
  // Use a public API for QR generation to be dependency-safe in this environment, 
  // although usually we'd use qrcode.react. This ensures the QR always renders without complex setup.
  const qrData = `upi://pay?pa=${user.upiId}&pn=${encodeURIComponent(user.name)}&cu=INR`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}&color=0f172a`;

  return (
    <div className="bg-slate-900 min-h-[85vh] text-white p-6 rounded-t-3xl relative flex flex-col items-center pt-10">
      <button 
        onClick={onBack} 
        className="absolute top-6 left-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
      >
        <ArrowLeft size={20} className="text-white" />
      </button>

      <h2 className="text-2xl font-bold mb-8">Receive Money</h2>

      <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-sm flex flex-col items-center">
         <div className="mb-4 text-center">
            <h3 className="text-slate-900 font-bold text-lg">{user.name}</h3>
            <p className="text-slate-500 text-sm">{user.upiId}</p>
         </div>

         <div className="bg-slate-50 p-4 rounded-2xl mb-6">
            <img 
              src={qrUrl} 
              alt="UPI QR Code" 
              className="w-48 h-48 mix-blend-multiply" 
            />
         </div>

         <div className="text-slate-400 text-xs text-center mb-6 max-w-[200px]">
           Scan this code with any UPI app to pay
         </div>

         <div className="grid grid-cols-3 gap-4 w-full">
            <button className="flex flex-col items-center gap-1 text-slate-600 hover:text-indigo-600 transition-colors">
              <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center">
                <Copy size={18} />
              </div>
              <span className="text-xs font-medium">Copy ID</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-slate-600 hover:text-indigo-600 transition-colors">
               <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center">
                <Share2 size={18} />
              </div>
              <span className="text-xs font-medium">Share</span>
            </button>
             <button className="flex flex-col items-center gap-1 text-slate-600 hover:text-indigo-600 transition-colors">
               <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center">
                <Download size={18} />
              </div>
              <span className="text-xs font-medium">Download</span>
            </button>
         </div>
      </div>
      
      <p className="mt-8 text-slate-400 text-sm">
        Payments go directly to your linked bank account.
      </p>
    </div>
  );
};

export default ReceiveMoney;

import React, { useState } from 'react';
import { Transaction } from '../types';
import { analyzeSpending } from '../services/geminiService';
import { Sparkles, Lightbulb, PieChart, TrendingUp, AlertCircle } from 'lucide-react';

interface SmartInsightsProps {
  transactions: Transaction[];
}

const SmartInsights: React.FC<SmartInsightsProps> = ({ transactions }) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await analyzeSpending(transactions);
      setAnalysis(result);
    } catch (err) {
      setError("Failed to generate insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20 min-h-screen">
      <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 rounded-b-3xl text-white shadow-lg mb-6">
         <div className="flex items-center gap-2 mb-2 opacity-80">
            <Sparkles size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">AI Powered</span>
         </div>
         <h2 className="text-3xl font-bold mb-2">Smart Insights</h2>
         <p className="text-violet-100 text-sm max-w-xs">
           Unlock financial clarity with Gemini AI. Analyze your spending patterns instantly.
         </p>
      </div>

      <div className="px-6">
        {!analysis && !loading && (
          <div className="text-center py-10 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="h-16 w-16 bg-violet-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <PieChart size={32} className="text-violet-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Ready to Analyze?</h3>
            <p className="text-slate-500 text-sm mb-6 px-4">
              We'll scan your transaction history to provide actionable tips and categories.
            </p>
            <button 
              onClick={handleAnalyze}
              className="bg-violet-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200"
            >
              Generate Insights
            </button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
             <div className="relative h-16 w-16">
                <div className="absolute inset-0 border-4 border-violet-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-violet-600 rounded-full border-t-transparent animate-spin"></div>
             </div>
             <p className="mt-6 text-slate-500 font-medium animate-pulse">Consulting Gemini AI...</p>
          </div>
        )}

        {error && (
           <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 border border-red-100">
             <AlertCircle size={20} />
             <p className="text-sm font-medium">{error}</p>
           </div>
        )}

        {analysis && !loading && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
             {/* Summary Card */}
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 mb-3 text-violet-600">
                   <TrendingUp size={20} />
                   <h3 className="font-bold">Spending Summary</h3>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {analysis.spendingSummary}
                </p>
             </div>

             {/* Top Category Card */}
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100">
                   <p className="text-xs text-orange-600 font-bold uppercase mb-1">Top Category</p>
                   <p className="text-xl font-bold text-slate-800 break-words">{analysis.topCategory}</p>
                </div>
                <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
                   <p className="text-xs text-blue-600 font-bold uppercase mb-1">Trend</p>
                   <p className="text-xl font-bold text-slate-800 capitalize">{analysis.spendingTrend}</p>
                </div>
             </div>

             {/* Tip Card */}
             <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-5 rounded-2xl text-white shadow-md relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3 opacity-90">
                    <Lightbulb size={20} className="text-yellow-200" />
                    <h3 className="font-bold">Advisor Tip</h3>
                  </div>
                  <p className="text-sm font-medium leading-relaxed opacity-95">
                    "{analysis.actionableTip}"
                  </p>
                </div>
                <div className="absolute -right-4 -bottom-8 h-24 w-24 bg-white/10 rounded-full blur-xl"></div>
             </div>

             <button 
                onClick={handleAnalyze} 
                className="w-full py-3 text-violet-600 font-medium text-sm hover:bg-violet-50 rounded-xl transition-colors"
              >
                Refresh Analysis
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartInsights;

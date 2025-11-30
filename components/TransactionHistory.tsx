import React, { useState } from 'react';
import { Transaction } from '../types';
import { Search, Filter, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = transactions.filter(t => {
    const matchesFilter = filter === 'all' || t.type === filter;
    const matchesSearch = t.payeeName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.amount.toString().includes(searchTerm) ||
                          t.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pb-20">
      <div className="sticky top-0 bg-[#f8fafc] z-10 pb-2 pt-1">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">History</h2>
        
        {/* Search & Filter Bar */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text"
              placeholder="Search transactions"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <button className="bg-white border border-slate-200 p-2.5 rounded-xl text-slate-600 hover:bg-slate-50">
            <Filter size={20} />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 mb-2 overflow-x-auto no-scrollbar">
          {(['all', 'debit', 'credit'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors whitespace-nowrap ${
                filter === f 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                : 'bg-white text-slate-500 border border-slate-200'
              }`}
            >
              {f === 'all' ? 'All Transactions' : f + 's'}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-3 mt-2">
        {filtered.length === 0 ? (
           <div className="text-center py-10 text-slate-400">
             <p>No transactions found.</p>
           </div>
        ) : (
          filtered.slice().reverse().map((tx) => (
            <div key={tx.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center group active:scale-[0.99] transition-transform">
              <div className="flex items-center gap-4">
                 <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${
                   tx.type === 'debit' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                 }`}>
                   {tx.type === 'debit' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                 </div>
                 <div>
                   <h4 className="font-semibold text-slate-800 text-sm">{tx.payeeName}</h4>
                   <p className="text-xs text-slate-400 mt-0.5">{new Date(tx.date).toLocaleDateString()} • {tx.category}</p>
                   {tx.note && <p className="text-[10px] text-slate-400 italic mt-0.5">"{tx.note}"</p>}
                 </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-sm ${tx.type === 'debit' ? 'text-slate-800' : 'text-green-600'}`}>
                  {tx.type === 'debit' ? '-' : '+'}₹{tx.amount.toLocaleString()}
                </p>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${tx.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {tx.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;

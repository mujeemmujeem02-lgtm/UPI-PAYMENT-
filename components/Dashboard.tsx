import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Transaction, UserState } from '../types';
import { TrendingUp, TrendingDown, Wallet, ArrowRight } from 'lucide-react';

interface DashboardProps {
  user: UserState;
  transactions: Transaction[];
  onNavigate: (tab: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, transactions, onNavigate }) => {
  
  const chartData = transactions
    .slice()
    .reverse()
    .map((t, index) => ({
      name: `Tx ${index + 1}`,
      amount: t.amount,
      type: t.type
    }));

  const recentTransactions = transactions.slice(0, 3);

  return (
    <div className="space-y-6 pb-20">
      {/* Header / Welcome */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">Welcome back,</p>
          <h1 className="text-2xl font-bold text-slate-800">{user.name}</h1>
        </div>
        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
          {user.name.charAt(0)}
        </div>
      </div>

      {/* Balance Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-500 p-6 text-white shadow-lg">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-indigo-100 mb-1">
            <Wallet size={18} />
            <span className="text-sm font-medium">Total Balance</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">₹{user.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
          
          <div className="flex gap-3">
             <button 
              onClick={() => onNavigate('send')}
              className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 px-4 rounded-lg font-medium transition-colors text-sm text-center"
            >
              Send
            </button>
             <button 
              onClick={() => onNavigate('receive')}
              className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 px-4 rounded-lg font-medium transition-colors text-sm text-center"
            >
              Request
            </button>
          </div>
        </div>
        
        {/* Decorative Circle */}
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-indigo-900/20 blur-xl"></div>
      </div>

      {/* Analytics Mini Chart */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-slate-700">Spending Overview</h3>
          <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-full">Last 7 Days</span>
        </div>
        <div className="h-32 w-full">
           <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ stroke: '#cbd5e1' }}
              />
              <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorAmount)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions Preview */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-slate-700">Recent Transactions</h3>
          <button onClick={() => onNavigate('history')} className="text-indigo-600 text-sm font-medium flex items-center hover:underline">
            View All <ArrowRight size={14} className="ml-1"/>
          </button>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                  {tx.type === 'credit' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                </div>
                <div>
                  <p className="font-medium text-slate-800 text-sm">{tx.payeeName || 'Unknown'}</p>
                  <p className="text-xs text-slate-400">{new Date(tx.date).toLocaleDateString()}</p>
                </div>
              </div>
              <span className={`font-semibold text-sm ${tx.type === 'credit' ? 'text-green-600' : 'text-slate-800'}`}>
                {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

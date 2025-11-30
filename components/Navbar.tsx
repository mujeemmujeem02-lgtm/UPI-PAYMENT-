import React from 'react';
import { Home, History, Sparkles, Send } from 'lucide-react';
import { AppTab } from '../types';

interface NavbarProps {
  activeTab: AppTab;
  onNavigate: (tab: AppTab) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate }) => {
  const navItems = [
    { id: AppTab.DASHBOARD, icon: Home, label: 'Home' },
    { id: AppTab.SEND, icon: Send, label: 'Pay' },
    { id: AppTab.INSIGHTS, icon: Sparkles, label: 'Insights' },
    { id: AppTab.HISTORY, icon: History, label: 'History' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 pb-6 z-50 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              isActive ? 'text-indigo-600 -translate-y-1' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className={`p-1.5 rounded-full transition-colors ${isActive ? 'bg-indigo-50' : 'bg-transparent'}`}>
              <Icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Navbar;

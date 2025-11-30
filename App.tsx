import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import SendMoney from './components/SendMoney';
import ReceiveMoney from './components/ReceiveMoney';
import TransactionHistory from './components/TransactionHistory';
import SmartInsights from './components/SmartInsights';
import Navbar from './components/Navbar';
import { INITIAL_USER, MOCK_TRANSACTIONS } from './constants';
import { AppTab, Transaction, UserState } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [user, setUser] = useState<UserState>(INITIAL_USER);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);

  const handleTransaction = (amount: number, payeeName: string, note: string) => {
    // 1. Deduct from Balance
    setUser(prev => ({ ...prev, balance: prev.balance - amount }));

    // 2. Add to History
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      type: 'debit',
      amount: amount,
      date: new Date().toISOString(),
      payeeName: payeeName,
      category: 'Transfer', // Simplified
      status: 'success',
      note: note
    };
    
    setTransactions(prev => [...prev, newTx]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard user={user} transactions={transactions} onNavigate={setActiveTab} />;
      case AppTab.SEND:
        return (
          <SendMoney 
            user={user} 
            onTransactionComplete={handleTransaction} 
            onBack={() => setActiveTab(AppTab.DASHBOARD)} 
          />
        );
      case AppTab.RECEIVE:
        return <ReceiveMoney user={user} onBack={() => setActiveTab(AppTab.DASHBOARD)} />;
      case AppTab.HISTORY:
        return <TransactionHistory transactions={transactions} />;
      case AppTab.INSIGHTS:
        return <SmartInsights transactions={transactions} />;
      default:
        return <Dashboard user={user} transactions={transactions} onNavigate={setActiveTab} />;
    }
  };

  const isFullscreenView = activeTab === AppTab.RECEIVE || activeTab === AppTab.SEND;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#f8fafc] relative shadow-2xl overflow-hidden">
      <main className={`h-full ${!isFullscreenView ? 'px-5 pt-8' : ''}`}>
        {renderContent()}
      </main>
      
      {!isFullscreenView && (
        <Navbar activeTab={activeTab} onNavigate={setActiveTab} />
      )}
    </div>
  );
};

export default App;

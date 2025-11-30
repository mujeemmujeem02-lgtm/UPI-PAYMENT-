export interface Transaction {
  id: string;
  type: 'debit' | 'credit';
  amount: number;
  date: string; // ISO string
  payeeName?: string;
  payeeUpi?: string;
  category: string;
  status: 'success' | 'failed' | 'processing';
  note?: string;
}

export interface UserState {
  balance: number;
  upiId: string;
  name: string;
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  SEND = 'send',
  RECEIVE = 'receive',
  HISTORY = 'history',
  INSIGHTS = 'insights',
}

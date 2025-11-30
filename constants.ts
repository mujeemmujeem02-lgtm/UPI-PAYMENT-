import { Transaction } from './types';

export const INITIAL_USER = {
  name: 'Alex Doe',
  upiId: 'alex.doe@paypulse',
  balance: 12500.75,
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_1',
    type: 'debit',
    amount: 450,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    payeeName: 'Starbucks Coffee',
    category: 'Food & Drink',
    status: 'success',
    note: 'Morning coffee',
  },
  {
    id: 'tx_2',
    type: 'credit',
    amount: 2500,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    payeeName: 'Jane Smith',
    category: 'Transfer',
    status: 'success',
    note: 'Dinner split',
  },
  {
    id: 'tx_3',
    type: 'debit',
    amount: 1299,
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    payeeName: 'Netflix',
    category: 'Entertainment',
    status: 'success',
    note: 'Monthly Subscription',
  },
  {
    id: 'tx_4',
    type: 'debit',
    amount: 240,
    date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    payeeName: 'Uber Rides',
    category: 'Transport',
    status: 'success',
  },
  {
    id: 'tx_5',
    type: 'debit',
    amount: 3500,
    date: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    payeeName: 'Grocery Mart',
    category: 'Groceries',
    status: 'success',
    note: 'Weekly supplies',
  },
  {
    id: 'tx_6',
    type: 'debit',
    amount: 150,
    date: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    payeeName: 'Spotify',
    category: 'Entertainment',
    status: 'success',
  },
];

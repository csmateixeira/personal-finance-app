import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'overview',
    title: 'Overview',
    loadComponent: () => import('./overview/pages/overview.component').then(m => m.OverviewComponent),
  },
  {
    path: 'transactions',
    title: 'Transactions',
    loadComponent: () => import('./transactions/pages/transactions.component').then(m => m.TransactionsComponent),
  },
  {
    path: 'budgets',
    title: 'Budgets',
    loadComponent: () => import('./budgets/pages/budgets.component').then(m => m.BudgetsComponent),
  },
  {
    path: 'pots',
    title: 'Pots',
    loadComponent: () => import('./pots/pages/pots.component').then(m => m.PotsComponent),
  },
  {
    path: 'bills',
    title: 'Recurring Bills',
    loadComponent: () => import('./bills/pages/bills.component').then(m => m.BillsComponent),
  },
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
];

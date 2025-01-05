import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'overview',
    title: 'Overview',
    loadComponent: () => import('./pages/overview/overview.component').then(m => m.OverviewComponent),
  },
  {
    path: 'transactions',
    title: 'Transactions',
    loadComponent: () => import('./pages/transactions/transactions.component').then(m => m.TransactionsComponent),
  },
  {
    path: 'budgets',
    title: 'Budgets',
    loadComponent: () => import('./pages/budgets/budgets.component').then(m => m.BudgetsComponent),
  },
  {
    path: 'pots',
    title: 'Pots',
    loadComponent: () => import('./pages/pots/pots.component').then(m => m.PotsComponent),
  },
  {
    path: 'bills',
    title: 'Recurring Bills',
    loadComponent: () => import('./pages/bills/bills.component').then(m => m.BillsComponent),
  },
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
];

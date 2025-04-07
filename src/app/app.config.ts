import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {SidebarReducer} from './sidebar/state/sidebar.reducer';
import {sidebarFeatureKey} from './sidebar/state/sidebar.state';
import {provideEffects} from '@ngrx/effects';
import {TransactionsEffects} from './transactions/state/transactions.effects';
import {TransactionsReducer} from './transactions/state/transactions.reducer';
import {transactionsFeatureKey} from './transactions/state/transactions.state';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {budgetsFeatureKey} from './budgets/state/budgets.state';
import {BudgetsReducer} from './budgets/state/budgets.reducer';
import {BudgetsEffects} from './budgets/state/budgets.effects';
import {potsFeatureKey} from './pots/state/pots.state';
import {PotsReducer} from './pots/state/pots.reducer';
import {PotsEffects} from './pots/state/pots.effects';
import {overviewFeatureKey} from './overview/state/overview.state';
import {OverviewReducer} from './overview/state/overview.reducer';
import {OverviewEffects} from './overview/state/overview.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      [sidebarFeatureKey]: SidebarReducer,
      [transactionsFeatureKey]: TransactionsReducer,
      [budgetsFeatureKey]: BudgetsReducer,
      [potsFeatureKey]: PotsReducer,
      [overviewFeatureKey]: OverviewReducer
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideEffects(TransactionsEffects, BudgetsEffects, PotsEffects, OverviewEffects),
    provideAnimationsAsync(),
]
};

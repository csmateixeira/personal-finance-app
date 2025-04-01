import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {SidebarReducer} from './state/reducers/sidebar.reducer';
import {sidebarFeatureKey} from './state/sidebar.state';
import {provideEffects} from '@ngrx/effects';
import {TransactionsEffects} from './state/effects/transactions.effects';
import {TransactionsReducer} from './state/reducers/transactions.reducer';
import {transactionsFeatureKey} from './state/transactions.state';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {budgetsFeatureKey} from './state/budgets.state';
import {BudgetsReducer} from './state/reducers/budgets.reducer';
import {BudgetsEffects} from './state/effects/budgets.effects';
import {potsFeatureKey} from './state/pots.state';
import {PotsReducer} from './state/reducers/pots.reducer';
import {PotsEffects} from './state/effects/pots.effects';
import {overviewFeatureKey} from './state/overview.state';
import {OverviewReducer} from './state/reducers/overview.reducer';
import {OverviewEffects} from './state/effects/overview.effects';

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

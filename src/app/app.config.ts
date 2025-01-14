import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {SidebarReducer} from './sidebar/state/sidebar.reducers';
import {sidebarFeatureKey} from './sidebar/state/sidebar.state';
import { provideEffects } from '@ngrx/effects';
import {TransactionsEffects} from './pages/transactions/state/transactions.effects';
import {TransactionsReducer} from './pages/transactions/state/transactions.reducers';
import {transactionsFeatureKey} from './pages/transactions/state/transactions.state';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ [sidebarFeatureKey]: SidebarReducer, [transactionsFeatureKey]: TransactionsReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideEffects(TransactionsEffects),
    provideAnimationsAsync(),
]
};

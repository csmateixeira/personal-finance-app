import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {SidebarReducer} from './sidebar/state/sidebar.reducers';
import {sidebarFeatureKey} from './sidebar/state/sidebar.state';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ [sidebarFeatureKey]: SidebarReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideEffects()
]
};

import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Pot} from "../models/pot.model";

export const PotsActions = createActionGroup(
  {
    source: 'Pots',
    events: {
      'Load Pots': emptyProps(),
      'Pots Loaded': props<{ pots: Pot[] }>(),
      'Edit Pot': props<{ newPot: Pot }>(),
      'Pot Edited': props<{ newPot: Pot }>(),
    }
  }
);

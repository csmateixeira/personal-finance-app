import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import {produce} from 'immer';
import {Pot, Theme} from '../../../models/features.models';
import {Utils} from '../../../utils/utils';
import {PotsState} from '../pots.state';
import {PotsActions} from '../actions/pots.actions';

export const initialState: Readonly<PotsState> = {
  data: [],
  themes: []
}

export const PotsReducer: ActionReducer<Readonly<PotsState>, Action> = createReducer(
  initialState,
  on(PotsActions.potsLoaded,
    (_state, {pots}) => produce(
      _state, draft => {
        const themes: Theme[] = Utils.initializeThemes();

        pots.forEach((pot: Pot) => {
          const themeIndex: number = themes.findIndex(theme => theme.color === pot.theme);
          themes[themeIndex].isUsed = true;
        });

        draft.data = pots;
        draft.themes = themes;
      }
    )),
);

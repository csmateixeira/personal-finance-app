import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import {produce} from 'immer';
import {Utils} from '../../shared/utils/utils';
import {PotsState} from './pots.state';
import {PotsActions} from './pots.actions';
import {Theme} from "../../shared/models/theme.model";
import {Pot} from '../models/pot.model';

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

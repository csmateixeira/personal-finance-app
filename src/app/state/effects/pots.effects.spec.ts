import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {PotsEffects} from './pots.effects';
import {PotsService} from '../../../services/pots.service';
import {TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import { PotsActions } from '../actions/pots.actions';
import {cold, hot} from 'jasmine-marbles';
import {PotsTestsUtils} from '../../../utils/test-utils';

describe('PotsEffects', () => {
  let actions$: Observable<Action>;
  let effects: PotsEffects;
  let service: PotsService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PotsEffects,
        provideMockActions(() => actions$),
        provideMockStore()
      ],
    });

    effects = TestBed.inject(PotsEffects);
    service = TestBed.inject(PotsService);

    spyOn(service, 'getAllPots').and.returnValue(of(PotsTestsUtils.getPots()));
  });

  describe('loadPots$', () => {
    it('should return success action to load all pots', () => {
      actions$ = hot('a', {
        a: PotsActions.loadPots()
      });

      const result = effects.loadPots$;

      expect(result).toBeObservable(cold('a', {
        a: {
          type: PotsActions.potsLoaded.type,
          pots: [
            {
              ...PotsTestsUtils.getPots()[0],
              percent:0.0795,
            },
            {
              ...PotsTestsUtils.getPots()[1],
              percent:0.7333,
            },
            {
              ...PotsTestsUtils.getPots()[2],
              percent:0,
            }
          ]
        }
      }));
      expect(service.getAllPots).toHaveBeenCalled();
    })
  });
});

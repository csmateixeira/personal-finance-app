import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {TestUtils} from './utils/test-utils';

describe('AppComponent', () => {
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideMockStore({ initialState: TestUtils.initialState }),
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

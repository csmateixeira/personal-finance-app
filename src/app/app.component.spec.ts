import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {TestUtils} from './shared/utils/test-utils';
import {RouterModule} from '@angular/router';

describe('AppComponent', () => {
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule.forRoot([])],
      providers: [
        provideMockStore({ initialState: TestUtils.getInitialState() }),
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

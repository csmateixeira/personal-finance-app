import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SidebarMinimizeComponent} from './sidebar-minimize.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {TestUtils} from '../../utils/test-utils';

describe('SidebarMinimizeComponent', () => {
  let component: SidebarMinimizeComponent;
  let fixture: ComponentFixture<SidebarMinimizeComponent>;

  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarMinimizeComponent],
      providers: [
        provideMockStore({ initialState: TestUtils.getInitialState() }),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarMinimizeComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

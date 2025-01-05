import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLogoComponent } from './sidebar-logo.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {TestUtils} from '../../../utils/test-utils';

describe('SidebarLogoComponent', () => {
  let component: SidebarLogoComponent;
  let fixture: ComponentFixture<SidebarLogoComponent>;

  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarLogoComponent],
      providers: [
        provideMockStore({ initialState: TestUtils.getInitialState() }),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarLogoComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarButtonComponent } from './sidebar-button.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {TestUtils} from '../../utils/test-utils';

describe('SidebarButtonComponent', () => {
  let component: SidebarButtonComponent;
  let fixture: ComponentFixture<SidebarButtonComponent>;

  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarButtonComponent],
      providers: [
        provideMockStore({ initialState: TestUtils.initialState }),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarButtonComponent);
    component = fixture.componentInstance;

    component.source = 'source.svg';
    component.text = 'Item Text';

    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

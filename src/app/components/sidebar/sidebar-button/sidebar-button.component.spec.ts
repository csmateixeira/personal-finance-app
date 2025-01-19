import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SidebarButtonComponent} from './sidebar-button.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {TestUtils} from '../../../../utils/test-utils';
import {Page} from '../../../../utils/models';
import {RouterModule} from '@angular/router';

describe('SidebarButtonComponent', () => {
  let component: SidebarButtonComponent;
  let fixture: ComponentFixture<SidebarButtonComponent>;

  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarButtonComponent, RouterModule.forRoot([])],
      providers: [
        provideMockStore({ initialState: TestUtils.getInitialState() })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarButtonComponent);
    component = fixture.componentInstance;

    component.text = 'Overview';
    component.linkTo = Page.overview;

    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

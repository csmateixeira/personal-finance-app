import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMinimizeComponent } from './sidebar-minimize.component';

describe('SidebarMinimizeComponent', () => {
  let component: SidebarMinimizeComponent;
  let fixture: ComponentFixture<SidebarMinimizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarMinimizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarMinimizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

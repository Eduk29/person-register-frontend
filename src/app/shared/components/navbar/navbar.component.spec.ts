import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [MatToolbarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a mat-toolbar component', () => {
    expect(document.getElementsByTagName('mat-toolbar')).toBeTruthy();
  });

  it('should render an app title ', () => {
    expect(document.getElementById('title')).toBeTruthy();
  });

  it('should render an app subtitle ', () => {
    expect(document.getElementById('subtitle')).toBeTruthy();
  });

  it('should title be Endeavour', () => {
    expect(document.getElementById('title')?.innerText).toBe('Endeavour');
  });

  it('should subtitle be Person Control', () => {
    expect(document.getElementById('subtitle')?.innerText).toBe('Person Control');
  });
});

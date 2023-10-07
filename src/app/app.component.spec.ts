import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NavbarModule } from './shared/components/navbar/navbar.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterModule, NavbarModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'person-register-frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('person-register-frontend');
  });

  it('should have a navbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const dom = fixture.nativeElement as HTMLElement;

    expect(dom.getElementsByTagName('edv-navbar')).toBeTruthy();
  });
});

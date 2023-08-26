import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { NoResultsComponent } from './no-results.component';
import { MatIconModule } from '@angular/material/icon';

describe('NoResultsComponent', () => {
  let component: NoResultsComponent;
  let fixture: ComponentFixture<NoResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoResultsComponent],
      imports: [MatCardModule, MatIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NoResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BreadcrumbsModule } from './../../../shared/components/breadcrumbs/breadcrumbs.module';
import { PersonDetailsPageComponent } from './person-details-page.component';

describe('PersonDetailsPageComponent', () => {
  let component: PersonDetailsPageComponent;
  let fixture: ComponentFixture<PersonDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonDetailsPageComponent],
      imports: [BreadcrumbsModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

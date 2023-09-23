import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PersonService } from '../../services/person.service';
import { BreadcrumbsModule } from './../../../shared/components/breadcrumbs/breadcrumbs.module';
import { PersonDetailsPageComponent } from './person-details-page.component';
import { PersonFormComponent } from '../person-form/person-form.component';

describe('PersonDetailsPageComponent', () => {
  let component: PersonDetailsPageComponent;
  let fixture: ComponentFixture<PersonDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonDetailsPageComponent, PersonFormComponent],
      imports: [BreadcrumbsModule, HttpClientModule, RouterTestingModule],
      providers: [PersonService],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

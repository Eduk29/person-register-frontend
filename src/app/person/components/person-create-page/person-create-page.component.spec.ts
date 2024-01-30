import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';

import { PersonFormComponent } from '../person-form/person-form.component';
import { BreadcrumbsModule } from './../../../shared/components/breadcrumbs/breadcrumbs.module';
import { LoaderModule } from './../../../shared/components/loader/loader.module';
import { PersonCreatePageComponent } from './person-create-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PersonCreatePageComponent', () => {
  let component: PersonCreatePageComponent;
  let fixture: ComponentFixture<PersonCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonCreatePageComponent, PersonFormComponent],
      imports: [
        BreadcrumbsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LoaderModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

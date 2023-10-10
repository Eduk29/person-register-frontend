import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { PersonService } from '../../services/person.service';
import { PersonFormComponent } from '../person-form/person-form.component';
import { BreadcrumbsModule } from './../../../shared/components/breadcrumbs/breadcrumbs.module';
import { FeedbackMessageService } from './../../../shared/components/feedback-messages/services/feedback-message.service';
import { LoaderModule } from './../../../shared/components/loader/loader.module';
import { PersonEditionPageComponent } from './person-edition-page.component';

describe('PersonEditionPageComponent', () => {
  let component: PersonEditionPageComponent;
  let fixture: ComponentFixture<PersonEditionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonEditionPageComponent, PersonFormComponent],
      imports: [BreadcrumbsModule, HttpClientModule, LoaderModule, MatSnackBarModule, RouterTestingModule],
      providers: [FeedbackMessageService, PersonService],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonEditionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

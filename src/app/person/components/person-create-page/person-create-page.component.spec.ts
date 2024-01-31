import { PAGINATED_SINGLE_PERSON_LIST } from './../../../shared/mocks/paginated-single-person-list.mock';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FeedbackMessagesModule } from 'src/app/shared/components/feedback-messages/feedback-messages.module';

import { IPerson } from '../../models/person.model';
import { PersonService } from '../../services/person.service';
import { PersonFormComponent } from '../person-form/person-form.component';
import { BreadcrumbsModule } from './../../../shared/components/breadcrumbs/breadcrumbs.module';
import { FeedbackMessageService } from './../../../shared/components/feedback-messages/services/feedback-message.service';
import { LoaderModule } from './../../../shared/components/loader/loader.module';
import { PersonCreatePageComponent } from './person-create-page.component';
import { of, throwError } from 'rxjs';

describe('PersonCreatePageComponent', () => {
  let component: PersonCreatePageComponent;
  let fixture: ComponentFixture<PersonCreatePageComponent>;
  let feedbackService: FeedbackMessageService;
  let personService: PersonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonCreatePageComponent, PersonFormComponent],
      imports: [
        BreadcrumbsModule,
        CommonModule,
        FeedbackMessagesModule,
        HttpClientModule,
        LoaderModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatNativeDateModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [PersonService],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    fixture = TestBed.createComponent(PersonCreatePageComponent);
    component = fixture.componentInstance;
    feedbackService = TestBed.inject(FeedbackMessageService);
    personService = TestBed.inject(PersonService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dispatchRegisterPersonAaction should call registerPerson method', () => {
    const fakePerson: IPerson = { id: 1, name: '', age: 999, birthday: '' };
    spyOn<any>(component, 'registerPerson').and.callFake(() => {});

    component.dispatchRegisterPersonAaction(fakePerson);

    expect(component['registerPerson']).toHaveBeenCalled();
  });

  it('dispatchRegisterPersonAaction should call registerPerson method', () => {
    const fakePerson: IPerson = { id: 1, name: '', age: 999, birthday: '' };
    spyOn<any>(component, 'registerPerson').and.callFake(() => {});

    component.dispatchRegisterPersonAaction(fakePerson);

    expect(component['registerPerson']).toHaveBeenCalledWith(fakePerson);
  });

  it('displayErrorFeedbackMessage should call displayAPIErrorFeedbackMessage method', () => {
    spyOn<any>(feedbackService, 'displayAPIErrorFeedbackMessage').and.callFake(() => {});

    component['displayErrorFeedbackMessage']();

    expect(feedbackService.displayAPIErrorFeedbackMessage).toHaveBeenCalled();
  });

  it('displaySuccessFeedbackMessage should call displayAPISuccessFeedbackMessage method', () => {
    spyOn<any>(feedbackService, 'displayAPISuccessFeedbackMessage').and.callFake(() => {});

    component['displaySuccessFeedbackMessage']();

    expect(feedbackService.displayAPISuccessFeedbackMessage).toHaveBeenCalled();
  });

  it('displaySuccessFeedbackMessage should call displayAPISuccessFeedbackMessage method with message', () => {
    spyOn<any>(feedbackService, 'displayAPISuccessFeedbackMessage').and.callFake(() => {});

    component['displaySuccessFeedbackMessage']();

    expect(feedbackService.displayAPISuccessFeedbackMessage).toHaveBeenCalledWith('Person registered with sucess');
  });

  it('redirectToDetailPage should call navigate from router', () => {
    spyOn<any>(component['router'], 'navigate').and.callFake(() => {});
    const fakePerson: IPerson = { id: 1, name: '', age: 999, birthday: '' };

    component['redirectToDetailPage'](fakePerson.id);

    expect(component['router'].navigate).toHaveBeenCalled();
  });

  it('redirectToDetailPage should call navigate to person Id element route', () => {
    spyOn<any>(component['router'], 'navigate').and.callFake(() => {});
    const fakePerson: IPerson = { id: 1, name: '', age: 999, birthday: '' };

    component['redirectToDetailPage'](fakePerson.id);

    expect(component['router'].navigate).toHaveBeenCalledWith(['..', 'person', 1]);
  });

  it('registerPerson should call person service new register method', () => {
    spyOn<any>(personService, 'registerPerson').and.returnValue(of(PAGINATED_SINGLE_PERSON_LIST));
    spyOn<any>(component, 'redirectToDetailPage').and.callFake(() => {});

    const fakePerson: IPerson = { id: 1, name: '', age: 999, birthday: '' };

    component['registerPerson'](fakePerson);

    expect(personService.registerPerson).toHaveBeenCalled();
  });

  it('registerPerson should call person service new register method with person data', () => {
    spyOn<any>(personService, 'registerPerson').and.returnValue(of(PAGINATED_SINGLE_PERSON_LIST));
    spyOn<any>(component, 'redirectToDetailPage').and.callFake(() => {});
    const fakePerson: IPerson = { id: 1, name: '', age: 999, birthday: '' };

    component['registerPerson'](fakePerson);

    expect(personService.registerPerson).toHaveBeenCalledWith(fakePerson);
  });

  it('registerPerson should call error feedback message when person is registered', () => {
    spyOn<any>(personService, 'registerPerson').and.returnValue(throwError(() => new HttpErrorResponse({ status: 0 })));
    spyOn<any>(component, 'displayErrorFeedbackMessage').and.callFake(() => {});
    const fakePerson: IPerson = { id: 1, name: '', age: 999, birthday: '' };

    component['registerPerson'](fakePerson);

    expect(component['displayErrorFeedbackMessage']).toHaveBeenCalled();
  });

  it('registerPerson should call success feedback message when person is registered', () => {
    spyOn<any>(personService, 'registerPerson').and.returnValue(of(PAGINATED_SINGLE_PERSON_LIST));
    spyOn<any>(component, 'displaySuccessFeedbackMessage').and.callFake(() => {});
    spyOn<any>(component, 'redirectToDetailPage').and.callFake(() => {});
    const fakePerson: IPerson = { id: 1, name: '', age: 999, birthday: '' };

    component['registerPerson'](fakePerson);

    expect(component['displaySuccessFeedbackMessage']).toHaveBeenCalled();
  });

  it('registerPerson should redirect to person details when new person is registered with success', () => {
    spyOn<any>(personService, 'registerPerson').and.returnValue(of(PAGINATED_SINGLE_PERSON_LIST));
    spyOn<any>(component, 'displaySuccessFeedbackMessage').and.callFake(() => {});
    spyOn<any>(component, 'redirectToDetailPage').and.callFake(() => {});
    const fakePerson: IPerson = { id: 1, name: '', age: 999, birthday: '' };

    component['registerPerson'](fakePerson);

    expect(component['redirectToDetailPage']).toHaveBeenCalled();
  });
});

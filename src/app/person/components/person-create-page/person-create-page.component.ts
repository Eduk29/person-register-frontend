import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { IPerson } from '../../models/person.model';
import { PersonService } from '../../services/person.service';
import { FeedbackMessageService } from './../../../shared/components/feedback-messages/services/feedback-message.service';
import { personNewBreadcrumbs } from './../../../shared/configurations/person-new-breadcrumb.configuration';
import { IBreadcrumbItem } from './../../../shared/models/breadcrumb-item.model';
import { IPaginatedResponse } from './../../../shared/models/paginated-response.model';

@Component({
  selector: 'edv-person-create-page',
  templateUrl: './person-create-page.component.html',
  styleUrls: ['./person-create-page.component.scss'],
})
export class PersonCreatePageComponent implements OnDestroy {
  public isLoading: boolean = false;
  public isSaving: boolean = false;
  public newPersonBreadcrumbs: IBreadcrumbItem[] = personNewBreadcrumbs;
  public person?: IPerson;

  private destroySubject$: Subject<void> = new Subject();

  constructor(
    private readonly feedbackMessageService: FeedbackMessageService,
    private readonly personService: PersonService,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.unsubscribe();
  }

  public dispatchRegisterPersonAaction(newPerson: IPerson): void {
    this.registerPerson(newPerson);
  }

  private displayErrorFeedbackMessage(): void {
    this.feedbackMessageService.displayAPIErrorFeedbackMessage();
  }

  private displaySuccessFeedbackMessage(): void {
    this.feedbackMessageService.displayAPISuccessFeedbackMessage('Person registered with sucess');
  }

  private redirectToDetailPage(personId: number): void {
    this.router.navigate(['..', 'person', personId]);
  }

  private registerPerson(person: IPerson): void {
    let personRegistered: IPerson | undefined;
    this.isSaving = true;
    this.personService
      .registerPerson(person)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({
        next: (response: IPaginatedResponse<IPerson>) => {
          if (response && response.content) {
            personRegistered = response.content.at(0);
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 0) {
            this.displayErrorFeedbackMessage();
            this.isSaving = false;
          }
        },
        complete: () => {
          this.displaySuccessFeedbackMessage();
          this.isSaving = false;

          if (personRegistered) {
            this.redirectToDetailPage(personRegistered.id);
          }
        },
      });
  }
}

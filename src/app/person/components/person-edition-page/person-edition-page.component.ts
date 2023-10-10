import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';

import { IPerson } from '../../models/person.model';
import { PersonService } from '../../services/person.service';
import { FeedbackMessageService } from './../../../shared/components/feedback-messages/services/feedback-message.service';
import { PersonEditionBreadcrumbsConfiguration } from './../../../shared/configurations/person-edit-breadcrumb.configuration';
import { IBreadcrumbItem } from './../../../shared/models/breadcrumb-item.model';
import { IPaginatedResponse } from './../../../shared/models/paginated-response.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'edv-person-edition-page',
  templateUrl: './person-edition-page.component.html',
  styleUrls: ['./person-edition-page.component.scss'],
})
export class PersonEditionPageComponent implements OnDestroy {
  public editBreadcrumbs: IBreadcrumbItem[] = PersonEditionBreadcrumbsConfiguration;
  public isLoading: boolean = false;
  public isUpdating: boolean = false;
  public person?: IPerson;

  private destroySubject$: Subject<void> = new Subject();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly feedbackMessageService: FeedbackMessageService,
    private readonly personService: PersonService
  ) {
    this.getPersonIdFromRouteParam();
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  public updatePerson(person: IPerson) {
    this.updatePersonById(person);
  }

  private displayErrorFeedbackMessage(): void {
    this.feedbackMessageService.displayAPIErrorFeedbackMessage();
  }

  private displaySuccessFeedbackMessage(): void {
    this.feedbackMessageService.displayAPISuccessFeedbackMessage('Person saved with sucess');
  }

  private getPersonById(personId: number): void {
    this.isLoading = true;
    this.personService
      .getPersonById(personId)
      .pipe(
        tap((response: IPaginatedResponse<IPerson>) => {
          if (!!response && response.content?.length === 1) {
            this.person = response.content[0];
          }
        }),
        takeUntil(this.destroySubject$)
      )
      .subscribe({
        error: (error: HttpErrorResponse) => {
          if (error.status === 0) {
            this.displayErrorFeedbackMessage();
            this.isLoading = false;
          }
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  private getPersonIdFromRouteParam(): void {
    this.activatedRoute.params
      .pipe(
        tap(params => {
          this.getPersonById(params['id']);
        }),
        takeUntil(this.destroySubject$)
      )
      .subscribe();
  }

  private updatePersonById(person: IPerson): void {
    this.isUpdating = true;
    const personId = this.person?.id as number;
    this.personService
      .updatePerson(personId, person)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({
        error: (error: HttpErrorResponse) => {
          if (error.status === 0) {
            this.displayErrorFeedbackMessage();
            this.isUpdating = false;
          }
        },
        complete: () => {
          this.displaySuccessFeedbackMessage();
          this.isUpdating = false;
        },
      });
  }
}

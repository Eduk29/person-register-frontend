import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';

import { IPerson } from '../../models/person.model';
import { PersonService } from '../../services/person.service';
import { FeedbackMessageService } from './../../../shared/components/feedback-messages/services/feedback-message.service';
import { personDetailBreadcrumbs } from './../../../shared/configurations/person-details-breadcrumb.configuration';
import { IBreadcrumbItem } from './../../../shared/models/breadcrumb-item.model';
import { IPaginatedResponse } from './../../../shared/models/paginated-response.model';

@Component({
  selector: 'edv-person-details-page',
  templateUrl: './person-details-page.component.html',
  styleUrls: ['./person-details-page.component.scss'],
})
export class PersonDetailsPageComponent implements OnDestroy {
  public detailBreadcrumbs: IBreadcrumbItem[] = personDetailBreadcrumbs;
  public isLoading: boolean = false;
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

  private displayFeedbackMessage(): void {
    this.feedbackMessageService.displayAPIErrorFeedbackMessage();
  }

  private getPersonById(personId: number): void {
    this.isLoading = true;
    this.personService
      .getPersonById(personId)
      .pipe(
        tap((response: IPaginatedResponse<IPerson>) => {
          if (!!response && response.content?.length === 1) {
            this.person = response.content[0];
            this.isLoading = false;
          }
        }),
        takeUntil(this.destroySubject$)
      )
      .subscribe({
        error: (error: HttpErrorResponse) => {
          if (error.status === 0) {
            this.displayFeedbackMessage();
            this.isLoading = false;
          }
        },
      });
  }

  private getPersonIdFromRouteParam(): void {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroySubject$),
        tap(params => {
          this.getPersonById(params['id']);
        })
      )
      .subscribe();
  }
}

import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';

import { IPerson } from '../../models/person.model';
import { PersonService } from '../../services/person.service';
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
  public person?: IPerson;

  private destroySubject$: Subject<void> = new Subject();

  constructor(
    private readonly personService: PersonService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.getPersonIdFromRouteParam();
  }
  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  private getPersonById(personId: number): void {
    console.log(personId);
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
      .subscribe();
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

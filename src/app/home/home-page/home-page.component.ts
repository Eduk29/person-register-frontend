import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { TableActionTypesEnum } from 'src/app/shared/enums/table-action-type.enum';

import { IPerson } from './../../person/models/person.model';
import { PersonService } from './../../person/services/person.service';
import { FeedbackMessageService } from './../../shared/components/feedback-messages/services/feedback-message.service';
import { TableActionsService } from './../../shared/components/table-actions/services/table-actions.service';
import { IPaginatedResponse } from './../../shared/models/paginated-response.model';
import { IPaginationParameters } from './../../shared/models/pagination-parameters.model';
import { ISearchFilter } from './../../shared/models/search-filter.model';
import { ITableAction } from './../../shared/models/table-action.model';

@Component({
  selector: 'edv-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnDestroy, OnInit {
  public isLoading: boolean = false;
  public paginationParameters: IPaginationParameters = {};
  public personList!: IPerson[];

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly feedbackMessageService: FeedbackMessageService,
    private readonly personService: PersonService,
    private readonly router: Router,
    private readonly tableActionsService: TableActionsService
  ) {
    this.catchTableActionEvent();
    this.configurePagination();
  }

  ngOnInit(): void {
    this.listAllPersons();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.unsubscribe();
  }

  public paginationEvent(page: PageEvent): void {
    this.configurePagination(page.pageIndex, page.pageSize);
    this.listAllPersons();
  }

  public search(filter: ISearchFilter): void {
    this.listByParameters(filter);
  }

  private catchTableActionEvent(): void {
    this.tableActionsService
      .getActionObservable()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((action: ITableAction) => {
        if (action.dataId && action.actionType === TableActionTypesEnum.DETAIL) {
          this.redirectToDetailsPage(action.dataId);
        }
        if (action.dataId && action.actionType === TableActionTypesEnum.EDIT) {
          this.redirectToEditionPage(action.dataId);
        }
      });
  }

  private configurePagination(pageIndex?: number, pageSize?: number, pageSizeOptions?: number[], totalCount?: number): void {
    this.paginationParameters.pageIndex = pageIndex || 0;
    this.paginationParameters.pageSize = pageSize || 10;
    this.paginationParameters.pageSizeOptions = pageSizeOptions || [1, 5, 10, 50, 100];
    this.paginationParameters.totalCount = totalCount || 0;
  }

  private constructPaginatedResponse(response: IPaginatedResponse<IPerson>): void {
    this.personList = response.content ? response.content : [];
    this.paginationParameters = {
      ...this.paginationParameters,
      pageIndex: response.pageNumber,
      pageSize: response.pageSize,
      totalCount: response.totalElements,
    };
  }

  private displayFeedbackMessage(): void {
    this.feedbackMessageService.displayAPIErrorFeedbackMessage();
  }

  private listAllPersons(): void {
    this.isLoading = true;
    this.personService
      .getAll(this.paginationParameters)
      .pipe(
        tap((response: IPaginatedResponse<IPerson>) => {
          this.constructPaginatedResponse(response);
          this.isLoading = false;
        }),
        takeUntil(this.onDestroy$)
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

  private listByParameters(searchParameters: ISearchFilter): void {
    this.isLoading = true;
    this.personService
      .getByParameter(this.paginationParameters, searchParameters)
      .pipe(
        tap((response: IPaginatedResponse<IPerson>) => {
          this.constructPaginatedResponse(response);
          this.isLoading = false;
        }),
        takeUntil(this.onDestroy$)
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

  private redirectToDetailsPage(personId: number): void {
    this.router.navigate(['..', 'person', personId]);
  }

  private redirectToEditionPage(personId: number): void {
    this.router.navigate(['..', 'person', personId, 'edit']);
  }
}

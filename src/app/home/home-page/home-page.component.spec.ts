import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { APP_BASE_ROUTES } from 'src/app/app.routes';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { DeleteDialogModule } from 'src/app/shared/components/delete-dialog/delete-dialog.module';
import { FeedbackMessagesComponent } from 'src/app/shared/components/feedback-messages/feedback-messages.component';
import { FeedbackMessageService } from 'src/app/shared/components/feedback-messages/services/feedback-message.service';
import { TableActionsService } from 'src/app/shared/components/table-actions/services/table-actions.service';
import { TableActionTypesEnum } from 'src/app/shared/enums/table-action-type.enum';
import { PERSON_LIST_MOCK } from 'src/app/shared/mocks/person-list.mock';
import { ITableAction } from 'src/app/shared/models/table-action.model';

import { PersonService } from './../../person/services/person.service';
import { DataTableModule } from './../../shared/components/data-table/data-table.module';
import { SearchInputModule } from './../../shared/components/search-input/search-input.module';
import { PAGINATED_PERSON_LIST } from './../../shared/mocks/paginated-person-list.mock';
import { ISearchFilter } from './../../shared/models/search-filter.model';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let feedbackMessagesService: FeedbackMessageService;
  let personService: PersonService;
  let tableActionService: TableActionsService;
  let router: Router;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent, FeedbackMessagesComponent],
      imports: [
        BrowserAnimationsModule,
        DataTableModule,
        HttpClientModule,
        DeleteDialogModule,
        MatDialogModule,
        MatIconModule,
        MatSnackBarModule,
        RouterTestingModule.withRoutes(APP_BASE_ROUTES),
        SearchInputModule,
      ],
      providers: [FeedbackMessageService, PersonService, TableActionsService],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    feedbackMessagesService = TestBed.inject(FeedbackMessageService);
    personService = TestBed.inject(PersonService);
    router = TestBed.get(Router);
    tableActionService = TestBed.inject(TableActionsService);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('paginationParameters should be defined when component init', () => {
    expect(component.paginationParameters).not.toBe({});
  });

  it('ngOnInit should call listPersons when component init', () => {
    spyOn<any>(component, 'listAllPersons').and.callThrough();

    component.ngOnInit();

    expect(component['listAllPersons']).toHaveBeenCalled();
  });

  it('personList should be defined when component init', () => {
    spyOn<any>(component, 'listAllPersons').and.returnValue(of({}));

    component.ngOnInit();

    expect(component['listAllPersons']).toBeDefined();
  });

  it('paginationEvent should call function to configure pagination parameters', () => {
    spyOn<any>(component, 'configurePagination').and.callThrough();
    const fakePageEvent: PageEvent = { pageIndex: 1, pageSize: 10, length: 100 };

    component.paginationEvent(fakePageEvent);

    expect(component['configurePagination']).toHaveBeenCalled();
  });

  it('paginationEvent should configure pagination parameters with new values', () => {
    spyOn<any>(component, 'configurePagination').and.callThrough();
    const fakePageEvent: PageEvent = { pageIndex: 1, pageSize: 10, length: 100 };
    component.paginationParameters = { pageIndex: 0, pageSize: 5, totalCount: 100 };

    component.paginationEvent(fakePageEvent);

    expect(component.paginationParameters.pageIndex).toBe(1);
    expect(component.paginationParameters.pageSize).toBe(10);
  });

  it('paginationEvent should call person list service', () => {
    spyOn<any>(component, 'listAllPersons').and.callThrough();
    const fakePageEvent: PageEvent = { pageIndex: 1, pageSize: 10, length: 100 };

    component.paginationEvent(fakePageEvent);

    expect(component['listAllPersons']).toHaveBeenCalled();
  });

  it('search should call person list service', () => {
    spyOn<any>(component, 'listByParameters').and.callThrough();
    const fakeFilter: ISearchFilter = { searchMode: { key: 'id', value: 'id' }, searchQuery: '1' };

    component.search(fakeFilter);

    expect(component['listByParameters']).toHaveBeenCalled();
  });

  it('search should call person list service with parameters', () => {
    spyOn<any>(component, 'listByParameters').and.callThrough();
    const fakeFilter: ISearchFilter = { searchMode: { key: 'id', value: 'id' }, searchQuery: '1' };

    component.search(fakeFilter);

    expect(component['listByParameters']).toHaveBeenCalledWith(fakeFilter);
  });

  it('listAllPersons should call service when called', () => {
    spyOn(personService, 'getAll').and.returnValue(of(PAGINATED_PERSON_LIST));
    component['listAllPersons']();

    expect(personService['getAll']).toHaveBeenCalled();
  });

  it('listAllPersons should set personList when service returns', () => {
    spyOn(personService, 'getAll').and.returnValue(of(PAGINATED_PERSON_LIST));
    component['listAllPersons']();

    expect(component.personList.length).toBe(8);
  });

  it('listAllPersons should set pagination parameters when service returns', () => {
    spyOn(personService, 'getAll').and.returnValue(of(PAGINATED_PERSON_LIST));
    component['listAllPersons']();

    expect(component.paginationParameters.pageIndex).toBe(999);
    expect(component.paginationParameters.pageSize).toBe(1);
    expect(component.paginationParameters.totalCount).toBe(999);
  });

  it('listByParameters should call service when called', () => {
    spyOn(personService, 'getByParameter').and.returnValue(of(PAGINATED_PERSON_LIST));
    const fakeFilter: ISearchFilter = { searchMode: { key: 'id', value: 'id' }, searchQuery: '1' };

    component['listByParameters'](fakeFilter);

    expect(personService['getByParameter']).toHaveBeenCalled();
  });

  it('listByParameters should set personList when service returns', () => {
    spyOn(personService, 'getByParameter').and.returnValue(of(PAGINATED_PERSON_LIST));
    const fakeFilter: ISearchFilter = { searchMode: { key: 'id', value: 'id' }, searchQuery: '1' };

    component['listByParameters'](fakeFilter);

    expect(component.personList.length).toBe(8);
  });

  it('listByParameters should set pagination parameters when service returns', () => {
    spyOn(personService, 'getByParameter').and.returnValue(of(PAGINATED_PERSON_LIST));
    const fakeFilter: ISearchFilter = { searchMode: { key: 'id', value: 'id' }, searchQuery: '1' };

    component['listByParameters'](fakeFilter);

    expect(component.paginationParameters.pageIndex).toBe(999);
    expect(component.paginationParameters.pageSize).toBe(1);
    expect(component.paginationParameters.totalCount).toBe(999);
  });

  it('constructPagignatedResponse should extract person list from response', () => {
    const fakeResponse = PAGINATED_PERSON_LIST;

    component['constructPaginatedResponse'](fakeResponse);

    expect(component.personList.length).toEqual(fakeResponse.content?.length as number);
  });

  it('constructPagignatedResponse should return person list length as 0 when response content is undefined', () => {
    const fakePaginatedResponse = { ...PAGINATED_PERSON_LIST };
    fakePaginatedResponse.content = undefined;
    const fakeResponse = fakePaginatedResponse;

    component['constructPaginatedResponse'](fakeResponse);

    expect(component.personList.length).toEqual(0);
  });

  it('displayFeedbackMessage should call feedbackMessageService to display a error message', () => {
    spyOn(feedbackMessagesService, 'displayAPIErrorFeedbackMessage').and.callThrough();

    component['displayFeedbackMessage']();

    expect(feedbackMessagesService.displayAPIErrorFeedbackMessage).toHaveBeenCalled();
  });

  it('listAllPersons should call feedbackMessageService to display a error message when api return some error', () => {
    spyOn(personService, 'getAll').and.returnValue(throwError(() => new HttpErrorResponse({ status: 0 })));
    const spyDisplayFeedbackMessages = spyOn<any>(component, 'displayFeedbackMessage').and.callThrough();

    component['listAllPersons']();

    expect(spyDisplayFeedbackMessages).toHaveBeenCalled();
  });

  it('listByParameters should call feedbackMessageService to display a error message when api return some error', () => {
    spyOn(personService, 'getByParameter').and.returnValue(throwError(() => new HttpErrorResponse({ status: 0 })));
    const spyDisplayFeedbackMessages = spyOn<any>(component, 'displayFeedbackMessage').and.callThrough();
    const fakeFilter: ISearchFilter = { searchMode: { key: 'id', value: 'id' }, searchQuery: '1' };

    component['listByParameters'](fakeFilter);

    expect(spyDisplayFeedbackMessages).toHaveBeenCalled();
  });

  it('catchTableActionEvent should catch table action event when detail table action is dispatched', () => {
    const fakeAction: ITableAction = {
      dataId: 999,
      actionType: TableActionTypesEnum.DETAIL,
    };
    spyOn<any>(HomePageComponent.prototype, 'catchTableActionEvent').and.callFake(() => {});
    spyOn<any>(component, 'redirectToDetailsPage').and.callFake(() => {});
    new HomePageComponent(dialog, feedbackMessagesService, personService, router, tableActionService);
    tableActionService.dispatchTableAction(fakeAction);

    expect(HomePageComponent.prototype['catchTableActionEvent']).toHaveBeenCalled();
  });

  it('catchTableActionEvent should catch table action event when edition table action is dispatched', () => {
    const fakeAction: ITableAction = {
      dataId: 999,
      actionType: TableActionTypesEnum.EDIT,
    };
    spyOn<any>(HomePageComponent.prototype, 'catchTableActionEvent').and.callFake(() => {});
    spyOn<any>(component, 'redirectToEditionPage').and.callFake(() => {});
    new HomePageComponent(dialog, feedbackMessagesService, personService, router, tableActionService);
    tableActionService.dispatchTableAction(fakeAction);

    expect(HomePageComponent.prototype['catchTableActionEvent']).toHaveBeenCalled();
  });

  it('catchTableActionEvent should catch table action event when delete table action is dispatched', () => {
    const fakeAction: ITableAction = {
      dataId: 999,
      actionType: TableActionTypesEnum.DELETE,
    };
    spyOn<any>(HomePageComponent.prototype, 'catchTableActionEvent').and.callFake(() => {});
    spyOn<any>(component, 'executeDeleteAction').and.callFake(() => {});
    new HomePageComponent(dialog, feedbackMessagesService, personService, router, tableActionService);

    tableActionService.dispatchTableAction(fakeAction);

    expect(component['executeDeleteAction']).toHaveBeenCalled();
  });

  it('redirectToDetailPage should call navigate from router when table action is dispatched', () => {
    spyOn<any>(component['router'], 'navigate').and.callFake(() => {});

    component['redirectToDetailsPage'](1);
    component['redirectToEditionPage'](1);

    expect(component['router'].navigate).toHaveBeenCalled();
    expect(component['router'].navigate).toHaveBeenCalled();
  });

  it('redirectToDetailPage should call navigate to detail page when edition table action is dispatched', () => {
    spyOn<any>(component['router'], 'navigate').and.callFake(() => {});

    component['redirectToDetailsPage'](1);

    expect(component['router'].navigate).toHaveBeenCalledWith(['..', 'person', 1]);
  });

  it('redirectToDetailPage should call navigate to edition page when edition table action is dispatched', () => {
    spyOn<any>(component['router'], 'navigate').and.callFake(() => {});

    component['redirectToEditionPage'](1);

    expect(component['router'].navigate).toHaveBeenCalledWith(['..', 'person', 1, 'edit']);
  });

  it('redirectToCreatePage should call navigate to new register page', () => {
    spyOn<any>(component['router'], 'navigate').and.callFake(() => {});

    component['redirectToCreatePage']();

    expect(component['router'].navigate).toHaveBeenCalledWith(['..', 'person', 'new']);
  });

  it('executeDeleteAction should open dialog', () => {
    spyOn<any>(dialog, 'open').and.callThrough();
    component.personList = PERSON_LIST_MOCK;

    component['executeDeleteAction'](1);

    expect(dialog.open).toHaveBeenCalled();
  });

  it('executeDeleteAction should open dialog with data', () => {
    spyOn<any>(dialog, 'open').and.callThrough();
    component.personList = PERSON_LIST_MOCK;
    const personToRemove = PERSON_LIST_MOCK[0];
    const fakeData = { data: { ...personToRemove } };

    component['executeDeleteAction'](1);

    expect(dialog.open).toHaveBeenCalledWith(DeleteDialogComponent, fakeData);
  });

  it('executeDeleteAction should call delete endpoint when delete action is dispatched', () => {
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(true),
    } as MatDialogRef<typeof component>);

    spyOn<any>(component, 'deleteById').and.callFake(() => {});
    component.personList = PERSON_LIST_MOCK;

    component['executeDeleteAction'](1);

    expect(component['deleteById']).toHaveBeenCalled();
  });

  it('deleteById should call deleteById method in personService', () => {
    spyOn(personService, 'deteleById').and.returnValue(of(null));

    component['deleteById'](1);

    expect(personService.deteleById).toHaveBeenCalled();
  });

  it('deleteById should call deleteById method in personService', () => {
    spyOn(personService, 'deteleById').and.returnValue(of(null));
    spyOn<any>(component, 'listAllPersons').and.callFake(() => {});

    component['deleteById'](1);

    expect(component['listAllPersons']).toHaveBeenCalled();
  });

  it('deleteById should call deleteById method in personService', () => {
    spyOn(personService, 'deteleById').and.returnValue(throwError(() => new HttpErrorResponse({ status: 0 })));
    spyOn<any>(component, 'displayFeedbackMessage').and.callFake(() => {});

    component['deleteById'](1);

    expect(component['displayFeedbackMessage']).toHaveBeenCalled();
  });
});

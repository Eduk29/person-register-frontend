import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { PersonService } from './../../person/services/person.service';
import { DataTableModule } from './../../shared/components/data-table/data-table.module';
import { SearchInputModule } from './../../shared/components/search-input/search-input.module';
import { PAGINATED_PERSON_LIST } from './../../shared/mocks/paginated-person-list.mock';
import { ISearchFilter } from './../../shared/models/search-filter.model';
import { HomePageComponent } from './home-page.component';
import { FeedbackMessageService } from 'src/app/shared/components/feedback-messages/services/feedback-message.service';
import { FeedbackMessagesComponent } from 'src/app/shared/components/feedback-messages/feedback-messages.component';
import { MatIconModule } from '@angular/material/icon';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let personService: PersonService;
  let feedbackMessagesService: FeedbackMessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent, FeedbackMessagesComponent],
      imports: [BrowserAnimationsModule, DataTableModule, HttpClientModule, MatIconModule, MatSnackBarModule, SearchInputModule],
      providers: [PersonService, FeedbackMessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    personService = TestBed.inject(PersonService);
    feedbackMessagesService = TestBed.inject(FeedbackMessageService);
    component = fixture.componentInstance;
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
    spyOn(personService, 'listAll').and.returnValue(of(PAGINATED_PERSON_LIST));
    component['listAllPersons']();

    expect(personService['listAll']).toHaveBeenCalled();
  });

  it('listAllPersons should set personList when service returns', () => {
    spyOn(personService, 'listAll').and.returnValue(of(PAGINATED_PERSON_LIST));
    component['listAllPersons']();

    expect(component.personList.length).toBe(8);
  });

  it('listAllPersons should set pagination parameters when service returns', () => {
    spyOn(personService, 'listAll').and.returnValue(of(PAGINATED_PERSON_LIST));
    component['listAllPersons']();

    expect(component.paginationParameters.pageIndex).toBe(999);
    expect(component.paginationParameters.pageSize).toBe(1);
    expect(component.paginationParameters.totalCount).toBe(999);
  });

  it('listByParameters should call service when called', () => {
    spyOn(personService, 'listByParameter').and.returnValue(of(PAGINATED_PERSON_LIST));
    const fakeFilter: ISearchFilter = { searchMode: { key: 'id', value: 'id' }, searchQuery: '1' };

    component['listByParameters'](fakeFilter);

    expect(personService['listByParameter']).toHaveBeenCalled();
  });

  it('listByParameters should set personList when service returns', () => {
    spyOn(personService, 'listByParameter').and.returnValue(of(PAGINATED_PERSON_LIST));
    const fakeFilter: ISearchFilter = { searchMode: { key: 'id', value: 'id' }, searchQuery: '1' };

    component['listByParameters'](fakeFilter);

    expect(component.personList.length).toBe(8);
  });

  it('listByParameters should set pagination parameters when service returns', () => {
    spyOn(personService, 'listByParameter').and.returnValue(of(PAGINATED_PERSON_LIST));
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
    spyOn(personService, 'listAll').and.returnValue(throwError(() => new HttpErrorResponse({ status: 0 })));
    const spyDisplayFeedbackMessages = spyOn<any>(component, 'displayFeedbackMessage').and.callThrough();

    component['listAllPersons']();

    expect(spyDisplayFeedbackMessages).toHaveBeenCalled();
  });

  it('listByParameters should call feedbackMessageService to display a error message when api return some error', () => {
    spyOn(personService, 'listByParameter').and.returnValue(throwError(() => new HttpErrorResponse({ status: 0 })));
    const spyDisplayFeedbackMessages = spyOn<any>(component, 'displayFeedbackMessage').and.callThrough();
    const fakeFilter: ISearchFilter = { searchMode: { key: 'id', value: 'id' }, searchQuery: '1' };

    component['listByParameters'](fakeFilter);

    expect(spyDisplayFeedbackMessages).toHaveBeenCalled();
  });
});

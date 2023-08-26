import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { PersonService } from './../../person/services/person.service';
import { DataTableModule } from './../../shared/components/data-table/data-table.module';
import { SearchInputModule } from './../../shared/components/search-input/search-input.module';
import { PAGINATED_PERSON_LIST } from './../../shared/mocks/paginated-person-list.mock';
import { ISearchFilter } from './../../shared/models/search-filter.model';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let service: PersonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageComponent],
      imports: [BrowserAnimationsModule, DataTableModule, HttpClientModule, SearchInputModule],
      providers: [PersonService],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    service = TestBed.inject(PersonService);
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
    spyOn(service, 'listAll').and.returnValue(of(PAGINATED_PERSON_LIST));
    component['listAllPersons']();

    expect(service['listAll']).toHaveBeenCalled();
  });

  it('listAllPersons should set personList when service returns', () => {
    spyOn(service, 'listAll').and.returnValue(of(PAGINATED_PERSON_LIST));
    component['listAllPersons']();

    expect(component.personList.length).toBe(8);
  });

  it('listAllPersons should set pagination parameters when service returns', () => {
    spyOn(service, 'listAll').and.returnValue(of(PAGINATED_PERSON_LIST));
    component['listAllPersons']();

    expect(component.paginationParameters.pageIndex).toBe(999);
    expect(component.paginationParameters.pageSize).toBe(1);
    expect(component.paginationParameters.totalCount).toBe(999);
  });

  it('listByParameters should call service when called', () => {
    spyOn(service, 'listByParameter').and.returnValue(of(PAGINATED_PERSON_LIST));
    const fakeFilter: ISearchFilter = { searchMode: { key: 'id', value: 'id' }, searchQuery: '1' };

    component['listByParameters'](fakeFilter);

    expect(service['listByParameter']).toHaveBeenCalled();
  });

  it('listByParameters should set personList when service returns', () => {
    spyOn(service, 'listByParameter').and.returnValue(of(PAGINATED_PERSON_LIST));
    const fakeFilter: ISearchFilter = { searchMode: { key: 'id', value: 'id' }, searchQuery: '1' };

    component['listByParameters'](fakeFilter);

    expect(component.personList.length).toBe(8);
  });

  it('listByParameters should set pagination parameters when service returns', () => {
    spyOn(service, 'listByParameter').and.returnValue(of(PAGINATED_PERSON_LIST));
    const fakeFilter: ISearchFilter = { searchMode: { key: 'id', value: 'id' }, searchQuery: '1' };

    component['listByParameters'](fakeFilter);

    expect(component.paginationParameters.pageIndex).toBe(999);
    expect(component.paginationParameters.pageSize).toBe(1);
    expect(component.paginationParameters.totalCount).toBe(999);
  });
});

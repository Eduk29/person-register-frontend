import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { PERSON_LIST_MOCK } from '../../mocks/person-list.mock';
import { IPaginationParameters } from '../../models/pagination-parameters.model';
import { NoResultsModule } from '../no-results/no-results.module';
import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableComponent],
      imports: [MatCardModule, MatTableModule, NoResultsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dataSource length should be 0 when component init', () => {
    expect(component.dataSource.length).toBe(0);
  });

  it('dataSource length should be different of 0 when person list is passed via input', () => {
    const fakeSimpleChange: SimpleChange = new SimpleChange(undefined, PERSON_LIST_MOCK, true);
    const fakeSimpleChanges: SimpleChanges = {
      personList: fakeSimpleChange,
    };

    component.ngOnChanges(fakeSimpleChanges);

    expect(component.dataSource.length).toBe(8);
  });

  it('paginatorEvent should call pagination event emitter', () => {
    spyOn(component.paginationEvent, 'emit').and.callThrough();
    const fakePage: PageEvent = { length: 100, pageIndex: 1, pageSize: 10 };

    component.paginatorEvent(fakePage);

    expect(component.paginationEvent.emit).toHaveBeenCalled();
  });

  it('displayTable should be true when person list lenght more than 0', () => {
    component.personList = PERSON_LIST_MOCK;

    expect(component.displayTable).toBeTrue();
  });

  it('displayTable should be false when person list lenght is equal to 0', () => {
    component.personList = [];

    expect(component.displayTable).toBeFalse();
  });

  it('length should return person list length when person list length is more than 0', () => {
    const fakePaginationParamenters: IPaginationParameters = { pageIndex: 0, pageSize: 10, totalCount: 100, pageSizeOptions: [1, 10] };

    component.paginationParameters = fakePaginationParamenters;

    expect(component.length).toEqual(fakePaginationParamenters.totalCount as number);
  });

  it('length should return 0 when person list length is equal to 0', () => {
    const fakePaginationParamenters: IPaginationParameters = {
      pageIndex: undefined,
      pageSize: undefined,
      totalCount: undefined,
      pageSizeOptions: undefined,
    };

    component.paginationParameters = fakePaginationParamenters;

    expect(component.length).toEqual(0);
  });

  it('pageIndex should return page inde when person list length is more than 0', () => {
    const fakePaginationParamenters: IPaginationParameters = { pageIndex: 0, pageSize: 10, totalCount: 100, pageSizeOptions: [1, 10] };

    component.paginationParameters = fakePaginationParamenters;

    expect(component.pageIndex).toEqual(fakePaginationParamenters.pageIndex as number);
  });

  it('pageIndex should return 0 when person list pageIndex is equal to 0', () => {
    const fakePaginationParamenters: IPaginationParameters = {
      pageIndex: undefined,
      pageSize: undefined,
      totalCount: undefined,
      pageSizeOptions: [1, 10],
    };

    component.paginationParameters = fakePaginationParamenters;

    expect(component.pageIndex).toEqual(0);
  });

  it('pageSize should return page size when person list length is more than 0', () => {
    const fakePaginationParamenters: IPaginationParameters = { pageIndex: 0, pageSize: 10, totalCount: 100, pageSizeOptions: [1, 10] };

    component.paginationParameters = fakePaginationParamenters;

    expect(component.pageSize).toEqual(fakePaginationParamenters.pageSize as number);
  });

  it('pageSize should return 0 when person list length is equal to 0', () => {
    const fakePaginationParamenters: IPaginationParameters = {
      pageIndex: undefined,
      pageSize: undefined,
      totalCount: undefined,
      pageSizeOptions: [1, 10],
    };

    component.paginationParameters = fakePaginationParamenters;

    expect(component.pageSize).toEqual(0);
  });

  it('pageSizeOptions should return page size options when person list length is more than 0', () => {
    const fakePaginationParamenters: IPaginationParameters = { pageIndex: 0, pageSize: 10, totalCount: 100, pageSizeOptions: [1, 10] };

    component.paginationParameters = fakePaginationParamenters;

    expect(component.pageSizeOptions).toEqual(fakePaginationParamenters.pageSizeOptions as number[]);
  });

  it('pageSizeOptions should 10, 25, 50 and 100 page size options when person list length is equal to 0', () => {
    const fakePaginationParamenters: IPaginationParameters = {
      pageIndex: undefined,
      pageSize: undefined,
      totalCount: undefined,
      pageSizeOptions: undefined,
    };

    component.paginationParameters = fakePaginationParamenters;

    expect(component.pageSizeOptions).toEqual([10, 25, 50, 100]);
  });
});

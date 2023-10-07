import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';

import { IPaginationParameters } from '../../models/pagination-parameters.model';
import { IPerson } from './../../../person/models/person.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'edv-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnChanges {
  @Input()
  public personList?: IPerson[];

  @Input()
  public paginationParameters?: IPaginationParameters;

  @Output()
  public paginationEvent: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  public dataSource: IPerson[] = [];
  public displayedColumns: string[] = ['id', 'name', 'age', 'birthday', 'actions'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['personList'] && changes['personList'].currentValue) {
      this.dataSource = changes['personList'].currentValue;
    }
  }

  public paginatorEvent(page: PageEvent): void {
    this.paginationEvent.emit(page);
  }

  public get displayTable(): boolean {
    return !!this.personList && this.personList.length > 0;
  }

  public get length(): number {
    return this.paginationParameters?.totalCount || 0;
  }

  public get pageIndex(): number {
    return this.paginationParameters?.pageIndex || 0;
  }

  public get pageSize(): number {
    return this.paginationParameters?.pageSize || 0;
  }

  public get pageSizeOptions(): number[] {
    return this.paginationParameters?.pageSizeOptions || [10, 25, 50, 100];
  }
}

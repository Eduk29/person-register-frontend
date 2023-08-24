import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import searchModeOptionsConfiguration from '../../configurations/search-mode-options.configuration';
import { ISearchFilter } from '../../models/search-filter.model';
import { ISystemValue } from '../../models/system-value.model';
import { SearchModeType } from '../../types/search-mode.type';

@Component({
  selector: 'edv-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchInputComponent {
  @Output()
  searchEvent = new EventEmitter<ISearchFilter>();

  public searchForm!: FormGroup;
  public searchModeOptionList: ISystemValue<SearchModeType>[] = searchModeOptionsConfiguration;

  constructor() {
    this.searchForm = this.createForm();
  }

  public get disableButton(): boolean {
    return this.searchForm.get('searchMode')?.value === null || this.searchForm.get('searchQuery')?.value === null;
  }

  public search(): void {
    const searchFilter: ISearchFilter = { ...this.searchForm.value };
    this.searchEvent.emit(searchFilter);
  }

  private createForm(): FormGroup {
    return new FormGroup({
      searchMode: new FormControl<SearchModeType>(null),
      searchQuery: new FormControl(null),
    });
  }
}

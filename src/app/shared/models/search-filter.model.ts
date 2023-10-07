import { SearchModeType } from '../types/search-mode.type';
import { ISystemValue } from './system-value.model';

export interface ISearchFilter {
  searchMode: ISystemValue<SearchModeType>;
  searchQuery: string;
}

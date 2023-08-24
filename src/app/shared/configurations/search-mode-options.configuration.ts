import { ISystemValue } from '../models/system-value.model';
import { SearchModeType } from '../types/search-mode.type';

const searchModeOptionsConfiguration: ISystemValue<SearchModeType>[] = [
  { key: 'Id', value: 'id' },
  { key: 'Name', value: 'name' },
  { key: 'Birthday', value: 'birthday' },
];

export default searchModeOptionsConfiguration;

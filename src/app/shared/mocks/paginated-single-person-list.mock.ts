import { IPerson } from 'src/app/person/models/person.model';

import { IPaginatedResponse } from '../models/paginated-response.model';
import { PERSON_LIST_MOCK } from './person-list.mock';

export const PAGINATED_SINGLE_PERSON_LIST: IPaginatedResponse<IPerson> = {
  content: [PERSON_LIST_MOCK[0]],
  totalPages: 999,
  totalElements: 999,
  pageSize: 1,
  pageNumber: 999,
  timestamp: '2023-08-25T23:29:57.116Z',
};

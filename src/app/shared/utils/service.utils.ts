import { IPaginationParameters } from '../models/pagination-parameters.model';
import { ISearchFilter } from '../models/search-filter.model';

export default class ServicesUtils {
  public static constructRequestParameters(paginationParameters?: IPaginationParameters, searchParameters?: ISearchFilter): string {
    const resquestParameters: string[] = [];

    if (!!paginationParameters && paginationParameters.pageIndex != undefined) {
      const basePageIndexParameter = `pageNumber=${paginationParameters.pageIndex as number}`;
      resquestParameters.push(basePageIndexParameter);
    }

    if (!!paginationParameters && paginationParameters.pageSize != undefined) {
      const basePageSizeParameter = `pageSize=${paginationParameters.pageSize as number}`;
      resquestParameters.push(basePageSizeParameter);
    }

    if (searchParameters && searchParameters.searchQuery != undefined && searchParameters != undefined) {
      const baseSearchParameter = `filter="${searchParameters.searchMode}=${searchParameters.searchQuery}"`;
      resquestParameters.push(baseSearchParameter);
    }

    return resquestParameters.join('&');
  }
}

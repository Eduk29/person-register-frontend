import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IPerson } from '../models/person.model';
import { environment } from './../../../environments/environment.development';
import { IPaginatedResponse } from './../../shared/models/paginated-response.model';
import { IPaginationParameters } from './../../shared/models/pagination-parameters.model';
import { ISearchFilter } from './../../shared/models/search-filter.model';
import ServicesUtils from './../../shared/utils/service.utils';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private readonly httpClient: HttpClient) {}

  public getAll(paginationParameters: IPaginationParameters): Observable<IPaginatedResponse<IPerson>> {
    const endpointBasePath = environment.personsEndpoints.listAll;
    const requestParameters = ServicesUtils.constructRequestParameters(paginationParameters);
    const endpointUrl = `${endpointBasePath}?${requestParameters}`;

    return this.httpClient.get<IPaginatedResponse<IPerson>>(endpointUrl);
  }

  public getByParameter(paginationParameters: IPaginationParameters, searchFilter: ISearchFilter): Observable<IPaginatedResponse<IPerson>> {
    const endpointBasePath = environment.personsEndpoints.listByParameter;
    const requestParameters = ServicesUtils.constructRequestParameters(paginationParameters, searchFilter);
    const endpointUrl = `${endpointBasePath}?${requestParameters}`;

    return this.httpClient.get<IPaginatedResponse<IPerson>>(endpointUrl);
  }

  public getPersonById(personId: number): Observable<IPaginatedResponse<IPerson>> {
    const endpointBasePath = environment.personsEndpoints.listAll;
    const endpointUrl = `${endpointBasePath}/${personId}`;

    return this.httpClient.get<IPaginatedResponse<IPerson>>(endpointUrl);
  }
}

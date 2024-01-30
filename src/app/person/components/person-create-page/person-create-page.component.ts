import { Component } from '@angular/core';

import { IPerson } from '../../models/person.model';
import { personNewBreadcrumbs } from './../../../shared/configurations/person-new-breadcrumb.configuration';
import { IBreadcrumbItem } from './../../../shared/models/breadcrumb-item.model';

@Component({
  selector: 'edv-person-create-page',
  templateUrl: './person-create-page.component.html',
  styleUrls: ['./person-create-page.component.scss'],
})
export class PersonCreatePageComponent {
  public isLoading: boolean = false;
  public newPersonBreadcrumbs: IBreadcrumbItem[] = personNewBreadcrumbs;
  public person?: IPerson;

  public registerPerson(newPerson: IPerson): void {
    console.log('Person to Register: ', newPerson);
  }
}

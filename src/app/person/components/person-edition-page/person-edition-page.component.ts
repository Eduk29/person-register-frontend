import { Component } from '@angular/core';

import { personEditionBreadcrumbs } from './../../../shared/configurations/person-edit-breadcrumb.configuration';
import { IBreadcrumbItem } from './../../../shared/models/breadcrumb-item.model';

@Component({
  selector: 'edv-person-edition-page',
  templateUrl: './person-edition-page.component.html',
  styleUrls: ['./person-edition-page.component.scss'],
})
export class PersonEditionPageComponent {
  public editBreadcrumbs: IBreadcrumbItem[] = personEditionBreadcrumbs;
}

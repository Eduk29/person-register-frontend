import { Component } from '@angular/core';

import { personDetailBreadcrumbs } from './../../../shared/configurations/person-details-breadcrumb.configuration';
import { IBreadcrumbItem } from './../../../shared/models/breadcrumb-item.model';

@Component({
  selector: 'edv-person-details-page',
  templateUrl: './person-details-page.component.html',
  styleUrls: ['./person-details-page.component.scss'],
})
export class PersonDetailsPageComponent {
  public detailBreadcrumbs: IBreadcrumbItem[] = personDetailBreadcrumbs;
}

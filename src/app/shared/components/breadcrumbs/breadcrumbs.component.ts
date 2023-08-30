import { Component, Input } from '@angular/core';

import { IBreadcrumbItem } from '../../models/breadcrumb-item.model';

@Component({
  selector: 'edv-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  @Input() breadcrumbsList: IBreadcrumbItem[] = [];

  public get displayBreadcrumbs(): boolean {
    return !!this.breadcrumbsList && this.breadcrumbsList.length > 0;
  }
}

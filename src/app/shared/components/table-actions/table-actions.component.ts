import { Component, Input } from '@angular/core';

import { TableActionTypesEnum } from '../../enums/table-action-type.enum';
import { ITableAction } from '../../models/table-action.model';
import { IPerson } from './../../../person/models/person.model';
import { TableActionsService } from './services/table-actions.service';

@Component({
  selector: 'edv-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss'],
})
export class TableActionsComponent {
  @Input() person?: IPerson;

  constructor(private readonly tableActionsService: TableActionsService) {}

  public dispatchDetailClickEvent(): void {
    const detailAction: ITableAction = {
      dataId: this.person?.id,
      actionType: TableActionTypesEnum.DETAIL,
    };
    this.tableActionsService.dispatchTableAction(detailAction);
  }

  public dispatchEditClickEvent(): void {
    const editionAction: ITableAction = {
      dataId: this.person?.id,
      actionType: TableActionTypesEnum.EDIT,
    };
    this.tableActionsService.dispatchTableAction(editionAction);
  }

  public dispatchDeleteClickEvent(): void {
    const deleteAction: ITableAction = {
      dataId: this.person?.id,
      actionType: TableActionTypesEnum.DELETE,
    };
    this.tableActionsService.dispatchTableAction(deleteAction);
  }
}

import { TableActionTypesEnum } from '../enums/table-action-type.enum';

export interface ITableAction {
  dataId?: number;
  actionType: TableActionTypesEnum;
}

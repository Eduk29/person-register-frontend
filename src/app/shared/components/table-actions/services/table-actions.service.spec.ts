import { TestBed } from '@angular/core/testing';

import { TableActionsService } from './table-actions.service';
import { TableActionTypesEnum } from 'src/app/shared/enums/table-action-type.enum';
import { ITableAction } from 'src/app/shared/models/table-action.model';

describe('TableActionsService', () => {
  let service: TableActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('dispatchTableAction should dispatch an table action when action was dispatched to subscribed components', () => {
    const fakeTableAction: ITableAction = {
      dataId: 1,
      actionType: TableActionTypesEnum.EDIT,
    };

    service.$tableActionSubscriber.subscribe(response => {
      expect(response).toBe(fakeTableAction);
    });

    service.dispatchTableAction(fakeTableAction);
  });

  it('clearActionSubscriber should clean subscriber when called', () => {
    service.$tableActionSubscriber.subscribe(response => {
      expect(response).toBe(undefined);
    });

    service.clearActionSubscriber();
  });
});

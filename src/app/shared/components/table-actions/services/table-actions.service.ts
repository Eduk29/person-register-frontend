import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ITableAction } from 'src/app/shared/models/table-action.model';

@Injectable({
  providedIn: 'root',
})
export class TableActionsService {
  public $tableActionSubscriber = new Subject<ITableAction | undefined>();

  constructor() {}

  public dispatchTableAction(tableAction: ITableAction): void {
    this.$tableActionSubscriber.next(tableAction);
  }

  public clearActionSubscriber(): void {
    this.$tableActionSubscriber.next(undefined);
  }

  public getActionObservable(): Observable<any> {
    return this.$tableActionSubscriber.asObservable();
  }
}

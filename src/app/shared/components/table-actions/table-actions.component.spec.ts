import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IPerson } from 'src/app/person/models/person.model';

import { TableActionTypesEnum } from '../../enums/table-action-type.enum';
import { TableActionsService } from './services/table-actions.service';
import { TableActionsComponent } from './table-actions.component';

describe('TableActionsComponent', () => {
  let component: TableActionsComponent;
  let fixture: ComponentFixture<TableActionsComponent>;
  let service: TableActionsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableActionsComponent],
      imports: [MatButtonModule, MatIconModule],
      providers: [TableActionsService],
    }).compileComponents();

    fixture = TestBed.createComponent(TableActionsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TableActionsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call data table service to dispatch an detail action call detail click event happens', () => {
    spyOn<any>(service, 'dispatchTableAction');

    component.dispatchDetailClickEvent();

    expect(service.dispatchTableAction).toHaveBeenCalled();
  });

  it('should call data table service to dispatch an detail action with details data when detail click event happens', () => {
    const fakePerson: IPerson = { id: 1, name: '', age: 999, birthday: '' };
    spyOn<any>(service, 'dispatchTableAction');

    component.person = fakePerson;
    component.dispatchDetailClickEvent();

    expect(service.dispatchTableAction).toHaveBeenCalledWith({
      dataId: 1,
      actionType: TableActionTypesEnum.DETAIL,
    });
  });

  it('should call data table service to dispatch an edition action when edition click event happens', () => {
    spyOn<any>(service, 'dispatchTableAction');

    component.dispatchEditClickEvent();

    expect(service.dispatchTableAction).toHaveBeenCalled();
  });

  it('should call data table service to dispatch an edition action with details data when edition click event happens', () => {
    const fakePerson: IPerson = { id: 1, name: '', age: 999, birthday: '' };
    spyOn<any>(service, 'dispatchTableAction');

    component.person = fakePerson;
    component.dispatchEditClickEvent();

    expect(service.dispatchTableAction).toHaveBeenCalledWith({
      dataId: 1,
      actionType: TableActionTypesEnum.EDIT,
    });
  });

  it('should call data table service to dispatch an edition action when delete click event happens', () => {
    spyOn<any>(service, 'dispatchTableAction');

    component.dispatchDeleteClickEvent();

    expect(service.dispatchTableAction).toHaveBeenCalled();
  });

  it('should call data table service to dispatch an delete action with details data when delete click event happens', () => {
    const fakePerson: IPerson = { id: 1, name: '', age: 999, birthday: '' };
    spyOn<any>(service, 'dispatchTableAction');

    component.person = fakePerson;
    component.dispatchDeleteClickEvent();

    expect(service.dispatchTableAction).toHaveBeenCalledWith({
      dataId: 1,
      actionType: TableActionTypesEnum.DELETE,
    });
  });
});

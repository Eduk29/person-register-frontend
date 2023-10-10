import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderModule } from './../../../shared/components/loader/loader.module';
import { PersonFormComponent } from './person-form.component';

describe('PersonFormComponent', () => {
  let component: PersonFormComponent;
  let fixture: ComponentFixture<PersonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonFormComponent],
      imports: [LoaderModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isDetailMode should return false when form mode is edit', () => {
    component.formMode = 'edit';

    expect(component.isDetailMode).toBe(false);
  });

  it('isDetailMode should return true when form mode is detail', () => {
    component.formMode = 'detail';

    expect(component.isDetailMode).toBe(true);
  });

  it('isEditMode should return true when form mode is edit', () => {
    component.formMode = 'edit';

    expect(component.isEditMode).toBe(true);
  });

  it('isEditMode should return false when form mode is detail', () => {
    component.formMode = 'detail';

    expect(component.isEditMode).toBe(false);
  });

  it('back shoudl call back function in history when called', () => {
    spyOn(history, 'back').and.callThrough();

    component.back();

    expect(history.back).toHaveBeenCalled();
  });
});

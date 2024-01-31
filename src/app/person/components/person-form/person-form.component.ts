import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { IPerson } from '../../models/person.model';
import { FormModeType } from './../../../shared/types/form-mode.type';

@Component({
  selector: 'edv-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PersonFormComponent implements OnChanges {
  @Input() displayBackButton: boolean = true;
  @Input() formMode: FormModeType = 'detail';
  @Input() isLoading?: boolean;
  @Input() person?: IPerson;
  @Input() title?: string;

  @Output() submitActionEvent: EventEmitter<IPerson> = new EventEmitter<IPerson>();

  public personForm!: FormGroup;

  constructor() {
    this.personForm = this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['person']) {
      const personToAssign = { ...changes['person'].currentValue };
      this.assignPersonToForm(personToAssign);
    } else {
      this.createForm();
    }
  }

  public get isDetailMode(): boolean {
    return this.formMode === 'detail';
  }

  public get isEditMode(): boolean {
    return this.formMode === 'edit';
  }

  public get isNewMode(): boolean {
    return this.formMode === 'new';
  }

  public get submitIconLabel(): string {
    return this.isEditMode ? 'save_as' : 'save';
  }

  public get submitLabel(): string {
    return this.isEditMode ? 'Update' : 'Register';
  }

  public back(): void {
    history.back();
  }

  public dispatchFormsubmitAction(): void {
    const person = this.extractPersonFromForm();
    this.submitActionEvent.emit(person);
  }

  private assignPersonToForm(person: IPerson): void {
    this.personForm.get('age')?.setValue(person.age);
    this.personForm.get('birthday')?.setValue(person.birthday);
    this.personForm.get('name')?.setValue(person.name);
  }

  private extractPersonFromForm(): IPerson {
    const newPerson: IPerson = {} as IPerson;

    newPerson.age = this.personForm.get('age')?.value;
    newPerson.birthday = this.personForm.get('birthday')?.value;
    newPerson.name = this.personForm.get('name')?.value;
    if (this.isEditMode) {
      newPerson.id = this.person?.id as number;
    }

    return newPerson;
  }

  private createForm(): FormGroup {
    return new FormGroup({
      age: new FormControl<number | undefined>(undefined),
      birthday: new FormControl<string | undefined>(undefined),
      name: new FormControl<string | undefined>(undefined),
    });
  }
}

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { IPerson } from '../../models/person.model';

@Component({
  selector: 'edv-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
})
export class PersonFormComponent implements OnChanges {
  @Input() displayBackButton: boolean = true;
  @Input() formMode: 'edit' | 'detail' = 'detail';
  @Input() person?: IPerson;
  @Input() title?: string;

  @Output() updatePersonEvent: EventEmitter<IPerson> = new EventEmitter<IPerson>();

  public personForm!: FormGroup;

  constructor() {
    this.personForm = this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['person']) {
      const personToAssign = { ...changes['person'].currentValue };
      this.assignPersonToForm(personToAssign);
    }
  }

  public get isDetailMode(): boolean {
    return this.formMode === 'detail';
  }

  public get isEditMode(): boolean {
    return this.formMode === 'edit';
  }

  public back(): void {
    history.back();
  }

  public dispatchUpdatePerson(): void {
    const personToUpdate = this.extractPersonFromForm();
    this.updatePersonEvent.emit(personToUpdate);
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
    newPerson.id = this.person?.id as number;

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

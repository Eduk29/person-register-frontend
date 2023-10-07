import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ISearchFilter } from '../../models/search-filter.model';
import { ISystemValue } from '../../models/system-value.model';
import { SearchModeType } from '../../types/search-mode.type';
import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchInputComponent],
      imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should form not be undefined when component starts', () => {
    expect(component.searchForm).not.toBeUndefined();
  });

  it('createForm should return a formGroup', () => {
    const form = component['createForm']();
    expect(form).toBeInstanceOf(FormGroup);
  });

  it('createForm should return a formGroup with searchMode and SearchQuery empty', () => {
    const form: FormGroup = component['createForm']();
    const searchMode = form.get('searchMode')?.value;
    const searchQuery = form.get('searchQuery')?.value;
    expect(searchMode).toBe(null);
    expect(searchQuery).toBe(null);
  });

  it('disableButton should be disable when form is empty', () => {
    component.searchForm.get('searchMode')?.setValue(null);
    component.searchForm.get('searchQuery')?.setValue(null);

    expect(component.disableButton).toBeTrue();
  });

  it('disableButton should be disable when form is empty', () => {
    component.searchForm.get('searchMode')?.setValue(null);
    component.searchForm.get('searchQuery')?.setValue('test');

    expect(component.disableButton).toBeTrue();
  });

  it('disableButton should be disable when form is empty', () => {
    const fakeSearchMode: ISystemValue<SearchModeType> = { key: 'Id', value: 'id' };

    component.searchForm.get('searchMode')?.setValue(fakeSearchMode);
    component.searchForm.get('searchQuery')?.setValue('test');

    expect(component.disableButton).toBeFalse();
  });

  it('button should be disable when form is empty', () => {
    const fakeSearchMode: ISystemValue<SearchModeType> = { key: 'Id', value: 'id' };

    component.searchForm.get('searchMode')?.setValue(fakeSearchMode);
    component.searchForm.get('searchQuery')?.setValue('teste');

    fixture.detectChanges();

    const buttonStatus = debugElement.nativeElement.querySelector('button').disabled;
    expect(buttonStatus).toBeFalse();
  });

  it('search should been called when button is pressed', () => {
    const fakeSearchMode: ISystemValue<SearchModeType> = { key: 'Id', value: 'id' };
    const button = debugElement.nativeElement.querySelector('button');
    spyOn(component, 'search').and.callThrough();

    component.searchForm.get('searchMode')?.setValue(fakeSearchMode);
    component.searchForm.get('searchQuery')?.setValue('teste');

    fixture.detectChanges();
    button.click();

    expect(component.search).toHaveBeenCalled();
  });

  it('search should been called with filter when button is pressed', () => {
    const fakeSearchMode: ISystemValue<SearchModeType> = { key: 'Id', value: 'id' };
    const fakeSearchFilter: ISearchFilter = { searchMode: fakeSearchMode, searchQuery: 'test' };
    spyOn(component.searchEvent, 'emit').and.stub();

    component.searchForm.get('searchMode')?.setValue(fakeSearchMode);
    component.searchForm.get('searchQuery')?.setValue('test');

    component.search();

    expect(component.searchEvent.emit).toHaveBeenCalledWith(fakeSearchFilter);
  });
});

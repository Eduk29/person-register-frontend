import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonEditionPageComponent } from './person-edition-page.component';

describe('PersonEditionPageComponent', () => {
  let component: PersonEditionPageComponent;
  let fixture: ComponentFixture<PersonEditionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonEditionPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonEditionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

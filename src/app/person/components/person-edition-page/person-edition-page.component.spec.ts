import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BreadcrumbsModule } from './../../../shared/components/breadcrumbs/breadcrumbs.module';
import { PersonEditionPageComponent } from './person-edition-page.component';

describe('PersonEditionPageComponent', () => {
  let component: PersonEditionPageComponent;
  let fixture: ComponentFixture<PersonEditionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonEditionPageComponent],
      imports: [BreadcrumbsModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonEditionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';

import { FeedbackMessagesComponent } from './feedback-messages.component';

describe('FeedbackMessagesComponent', () => {
  let component: FeedbackMessagesComponent;
  let fixture: ComponentFixture<FeedbackMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbackMessagesComponent],
      imports: [CommonModule, MatIconModule, MatSnackBarModule],
      providers: [
        {
          provide: MatSnackBarRef,
          useValue: {},
        },
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display close button status as true when parameter is passed', () => {
    component.feedbackMessageParameters.displayCloseButton = true;

    expect(component.displayCloseButton).toBe(true);
  });

  it('should display close button status as false when parameter is not passed', () => {
    component.feedbackMessageParameters.displayCloseButton = undefined;

    expect(component.displayCloseButton).toBe(false);
  });

  it('should display icon status as true when parameter is passed', () => {
    component.feedbackMessageParameters.displayIcon = true;

    expect(component.displayIcon).toBe(true);
  });

  it('should display icon status as false when parameter is not passed', () => {
    component.feedbackMessageParameters.displayIcon = undefined;

    expect(component.displayIcon).toBe(false);
  });

  it('should display title status as true when parameter is passed', () => {
    component.feedbackMessageParameters.displayTitle = true;

    expect(component.displayTitle).toBe(true);
  });

  it('should display title status as false when parameter is not passed', () => {
    component.feedbackMessageParameters.displayTitle = undefined;

    expect(component.displayTitle).toBe(false);
  });

  it('should icon name when parameter is passed', () => {
    component.feedbackMessageParameters.iconName = 'warning';

    expect(component.iconName).toBe('warning');
  });

  it('should message when parameter is passed', () => {
    component.feedbackMessageParameters.message = 'test';

    expect(component.message).toBe('test');
  });

  it('should title when parameter is passed', () => {
    component.feedbackMessageParameters.title = 'test';

    expect(component.title).toBe('test');
  });
});

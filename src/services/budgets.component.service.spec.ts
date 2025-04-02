import {BudgetsComponentService} from './budgets.component.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TestBed} from '@angular/core/testing';
import {BudgetForm} from '../models/features.models';
import {ModalAction, ModalTitleDetails} from '../models/models';

describe('BudgetsComponentService', () => {
  let service: BudgetsComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BudgetsComponentService,
        FormBuilder
      ]
    });

    service = TestBed.inject(BudgetsComponentService);
  });

  it('should build a budget form', () => {
    const form: FormGroup<BudgetForm> = service.buildBudgetForm();

    expect(form).toBeTruthy();
    expect(form.controls.category).toBeTruthy();
    expect(form.controls.maximum).toBeTruthy();
    expect(form.controls.theme).toBeTruthy();
  });

  it('should check if the form has values', () => {
    const form: FormGroup<BudgetForm> = service.buildBudgetForm();

    expect(service.formHasValues(form)).toBeFalsy();

    form.controls.category.setValue('Food');
    form.controls.maximum.setValue(100);
    form.controls.theme.setValue('green');

    expect(service.formHasValues(form)).toBeTruthy();
  });

  describe('getModalTitleDetails', () => {
    it('should return the correct modal title details for delete action', () => {
      const details: ModalTitleDetails = service.getModalTitleDetails(ModalAction.delete, 'Food');

      expect(details).toEqual({
        title: 'Delete Food?',
        description: 'Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.',
        buttonText: 'Yes, Confirm Deletion'
      });
    });

    it('should return the correct modal title details for edit action', () => {
      const details: ModalTitleDetails = service.getModalTitleDetails(ModalAction.edit, 'Food');

      expect(details).toEqual({
        title: 'Edit Budget',
        description: 'As your budgets change, feel free to update your spending limits.',
        buttonText: 'Save Changes'
      });
    });

    it('should return the correct modal title details for add action', () => {
      const details: ModalTitleDetails = service.getModalTitleDetails(ModalAction.add, 'Food');

      expect(details).toEqual({
        title: 'Add New Budget',
        description: 'Choose a category to set a spending budget. These categories can help you monitor spending.',
        buttonText: 'Add Budget'
      });
    });
  });
});

import {inject, Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BudgetForm} from '../models/features.models';
import {ModalAction, ModalTitleDetails} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class BudgetsComponentService {
  private formBuilder: FormBuilder = inject(FormBuilder);

  buildBudgetForm(): FormGroup<BudgetForm> {
    return this.formBuilder.group({
      category: this.formBuilder.control<string | null>(null, Validators.required),
      maximum: this.formBuilder.control<number | null>(null, [Validators.required, Validators.min(0)]),
      theme: this.formBuilder.control<string | null>(null, Validators.required)
    });
  }

  formHasValues(form: FormGroup<BudgetForm>): boolean {
    return form.value.category !== null && form.value.maximum !== null && form.value.theme !== null;
  }

  getModalTitleDetails(action: ModalAction, category: string): ModalTitleDetails {
    switch (action) {
      case ModalAction.delete:
        return {
          title: `Delete ${category}?`,
          description: 'Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.',
          buttonText: 'Yes, Confirm Deletion'
        };
      case ModalAction.edit:
        return {
          title: 'Edit Budget',
          description: 'As your budgets change, feel free to update your spending limits.',
          buttonText: 'Save Changes'
        };
      case ModalAction.add:
        return {
          title: 'Add New Budget',
          description: 'Choose a category to set a spending budget. These categories can help you monitor spending.',
          buttonText: 'Add Budget'
        };
    }
  }
}

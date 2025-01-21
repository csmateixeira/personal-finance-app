import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {BudgetAction, Option} from '../../../../models/models';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {combineLatest, map, Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectTransactionsCategories} from '../../../state/transactions.state';
import {SelectComponent} from '../../shared/select/select.component';
import {Budget, BudgetsTheme} from '../../../../models/features.models';
import {selectBudgetsData, selectBudgetsThemes} from '../../../state/budgets.state';
import {BudgetsActions} from '../../../state/actions/budgets.actions';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-budget-dialog',
  imports: [
    Dialog,
    NgOptimizedImage,
    ReactiveFormsModule,
    AsyncPipe,
    SelectComponent
  ],
  templateUrl: './budget-dialog.component.html',
  styleUrl: './budget-dialog.component.scss'
})
export class BudgetDialogComponent implements OnInit, OnDestroy {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private store: Store = inject(Store);
  protected readonly BudgetAction = BudgetAction;

  @Input() action!: BudgetAction;
  @Input() showDialog!: boolean;

  @Input() category!: string;

  @Output() actionEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeDialogEvent: EventEmitter<void> = new EventEmitter<void>();

  budgets$: Observable<Budget[]> = this.store.select(selectBudgetsData);
  categories$: Observable<Option[]> = this.store.select(selectTransactionsCategories);
  themes$: Observable<Option[]> = this.store.select(selectBudgetsThemes).pipe(
    map((themes: BudgetsTheme[]): Option[] => themes.map((theme: BudgetsTheme) => ({
      id: theme.id,
      value: theme.name,
      prefix: theme.color,
      postfix: theme.isUsed ? 'Already used' : ''
    })))
  );
  filteredCategories$?: Observable<Option[]>;

  title: string = '';
  description: string = '';
  buttonText: string = '';

  budgetForm = this.formBuilder.group({
    category: this.formBuilder.control<string | null>(null, Validators.required),
    maximum: this.formBuilder.control<number | null>(null, [Validators.required, Validators.min(0)]),
    theme: this.formBuilder.control<string | null>(null, Validators.required)
  });

  private subs: Subscription[] = []

  ngOnInit() {
    this.filteredCategories$ = combineLatest([this.categories$, this.budgets$]).pipe(
      map(([categories, budgets]): Option[] => categories
        .filter((category: Option) => category.id !== -1)
        .filter((category: Option) => !budgets.some(budget => budget.category === category.value))
      )
    );

    switch (this.action) {
      case BudgetAction.delete:
        this.title = `Delete ${this.category}?`;
        this.description = 'Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.';
        this.buttonText = 'Yes, Confirm Deletion';
        break;
      case BudgetAction.edit:
        this.title = 'Edit Budget';
        this.description = 'As your budgets change, feel free to update your spending limits.';
        this.buttonText = 'Save Changes';
        break;
      case BudgetAction.add:
        this.title = 'Add New Budget';
        this.description = 'Choose a category to set a spending budget. These categories can help you monitor spending.';
        this.buttonText = 'Add Budget';
        break;
    }
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe())
  }

  closeDialog() {
    this.closeDialogEvent.emit();
  }

  submit() {
    switch (this.action) {
      case BudgetAction.delete:
        this.store.dispatch(BudgetsActions.deleteBudget({category: this.category}));
        break;
      case BudgetAction.edit:
        if (!this.formHasValues()) {
          this.store.dispatch(BudgetsActions.editBudget({
            newBudget: {
              category: this.budgetForm.controls.category.value!,
              maximum: this.budgetForm.controls.maximum.value!,
              theme: this.budgetForm.controls.theme.value!
            }
          }));
        }
        break;
      case BudgetAction.add:
        if (this.formHasValues()) {
          this.store.dispatch(BudgetsActions.addBudget({
            newBudget: {
              id: uuidv4(),
              category: this.budgetForm.controls.category.value!,
              maximum: this.budgetForm.controls.maximum.value!,
              theme: this.budgetForm.controls.theme.value!
            }
          }));
        }
        break;
    }

    this.budgetForm.reset();
    this.actionEvent.emit();
  }

  updateCategory(newCategory: Option) {
    this.subs.push(this.categories$.subscribe(categories => {
      const category: string = categories.find((category: Option) => category.id === newCategory.id)!.value;
      this.budgetForm.controls.category.setValue(category);
    }));
  }

  updateTheme(newTheme: Option) {
    this.subs.push(this.themes$.subscribe(themes => {
      const theme: string = themes.find((theme: Option) => theme.id === newTheme.id)!.value;
      this.budgetForm.controls.theme.setValue(theme);
    }));
  }

  private formHasValues() {
    return this.budgetForm.controls.category.value && this.budgetForm.controls.maximum.value && this.budgetForm.controls.theme.value;
  }
}

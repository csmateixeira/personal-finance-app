import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {combineLatest, map, Observable, Subscription, tap} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectTransactionsCategories} from '../../../transactions/state/transactions.state';
import {SelectComponent} from '../../../shared/components/select/select.component';
import {selectBudgetsData, selectBudgetsThemes} from '../../state/budgets.state';
import {BudgetsActions} from '../../state/budgets.actions';
import {BudgetDialogUtils} from './budget-dialog.utils';
import {BudgetsUtils} from '../../budgets.utils';
import {Utils} from '../../../shared/utils/utils';
import {Budget} from '../../models/budget.model';
import {Theme} from '../../../shared/models/theme.model';
import {Option} from '../../../shared/models/option.model';
import {BudgetAction} from '../../../shared/models/action.model';

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
        map((themes: Theme[]): Option[] => themes.map((theme: Theme) => ({
            id: theme.id,
            value: theme.name,
            prefix: theme.color,
            postfix: theme.isUsed ? 'Already used' : ''
        })))
    );
    selectedBudget$?: Observable<Budget>;
    selectedTheme$?: Observable<number>;
    selectedCategory$?: Observable<number>;
    filteredCategories$?: Observable<Option[]>;

    title: string = '';
    description: string = '';
    buttonText: string = '';
    enableSelects: boolean = true;

    budgetForm = this.formBuilder.group({
        category: this.formBuilder.control<string | null>(null, Validators.required),
        maximum: this.formBuilder.control<number | null>(null, [Validators.required, Validators.min(0)]),
        theme: this.formBuilder.control<string | null>(null, Validators.required)
    });

    private subs: Subscription[] = []

    ngOnInit() {
        this.updateFilteredCategories();

        switch (this.action) {
            case BudgetAction.delete:
                this.updateDetails(`Delete ${this.category}?`,
                    'Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.',
                    'Yes, Confirm Deletion');
                break;
            case BudgetAction.edit:
                this.updateDetails('Edit Budget',
                    'As your budgets change, feel free to update your spending limits.',
                    'Save Changes');
                this.initForm();
                break;
            case BudgetAction.add:
                this.updateDetails('Add New Budget',
                    'Choose a category to set a spending budget. These categories can help you monitor spending.',
                    'Add Budget');
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
                    this.sendEditAction();
                }
                break;
            case BudgetAction.add:
                if (this.formHasValues()) {
                    this.sendAddAction();
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
          this.budgetForm.controls.theme.setValue(Utils.findOptionById(themes, newTheme.id).value);
        }));
    }

    private initForm() {
        this.enableSelects = false;

        this.selectedBudget$ = this.budgets$.pipe(
            map((budgets: Budget[]): Budget => BudgetsUtils.findBudgetByCategory(budgets, this.category)),
            tap((budget: Budget) => {
                this.budgetForm.controls.maximum.setValue(budget.maximum);
                this.budgetForm.controls.category.setValue(budget.category);
            })
        );

        this.selectedTheme$ = combineLatest([this.themes$, this.selectedBudget$]).pipe(
            map(([themes, selectedBudget]: [Option[], Budget]): number => BudgetDialogUtils.getSelectedTheme(this.action, themes, selectedBudget))
        );

        this.selectedCategory$ = this.categories$.pipe(
            map((categories: Option[]): number => BudgetDialogUtils.getSelectedCategory(this.action, categories, this.category))
        );

    }

    private sendAddAction() {
        this.store.dispatch(BudgetsActions.addBudget({
            newBudget: {
                category: this.budgetForm.controls.category.value!,
                maximum: this.budgetForm.controls.maximum.value!,
                theme: this.budgetForm.controls.theme.value!
            }
        }));
    }

    private sendEditAction() {
        this.store.dispatch(BudgetsActions.editBudget({
            newBudget: {
                category: this.budgetForm.controls.category.value!,
                maximum: this.budgetForm.controls.maximum.value!,
                theme: this.budgetForm.controls.theme.value!
            }
        }));
    }

    private updateFilteredCategories() {
        this.filteredCategories$ = combineLatest([this.categories$, this.budgets$]).pipe(
            map(([categories, budgets]): Option[] => BudgetDialogUtils.filterCategories(categories, budgets, this.action))
        );
    }

    private formHasValues() {
        return this.budgetForm.controls.category.value && this.budgetForm.controls.maximum.value && this.budgetForm.controls.theme.value;
    }

    private updateDetails(title: string, description: string, buttonText: string) {
        this.title = title;
        this.description = description;
        this.buttonText = buttonText
    }
}

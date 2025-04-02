import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Dialog} from 'primeng/dialog';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {ModalAction, ModalTitleDetails, Option} from '../../../../models/models';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {SelectComponent} from '../../shared/select/select.component';
import {Budget, BudgetForm} from '../../../../models/features.models';
import {Utils} from '../../../../utils/utils';
import {BudgetsService} from '../../../../services/budgets.service';
import {BudgetsComponentService} from '../../../../services/budgets.component.service';

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
    private budgetsService: BudgetsService = inject(BudgetsService);
    private budgetsComponentService: BudgetsComponentService = inject(BudgetsComponentService);

    protected readonly ModalAction = ModalAction;
    private subs: Subscription[] = []

    @Input() action!: ModalAction;
    @Input() showDialog!: boolean;

    @Input() category!: string;

    @Output() actionEvent: EventEmitter<void> = new EventEmitter<void>();
    @Output() closeDialogEvent: EventEmitter<void> = new EventEmitter<void>();

    themes$: Observable<Option[]> = this.budgetsService.getThemesAsOptionsFromStore();
    selectedTheme$?: Observable<number>;
    selectedCategory$?: Observable<number>;
    filteredCategories$?: Observable<Option[]>;

    modalTitleDetails: ModalTitleDetails = {
        title: '',
        description: '',
        buttonText: ''
    };
    enableSelects: boolean = true;

    budgetForm: FormGroup<BudgetForm> = this.budgetsComponentService.buildBudgetForm();

    ngOnInit() {
        this.filteredCategories$ = this.budgetsService.getFilteredCategoriesFromStore(this.action);

        this.modalTitleDetails = this.budgetsComponentService.getModalTitleDetails(this.action, this.category);

        if (this.action === ModalAction.edit){
          this.initForm();
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
            case ModalAction.delete:
                this.budgetsService.sendDeleteAction(this.category);
                break;
            case ModalAction.edit:
                if (!this.budgetsComponentService.formHasValues(this.budgetForm)) {
                  this.budgetsService.sendEditAction(
                    this.budgetForm.controls.category.value!,
                    this.budgetForm.controls.maximum.value!,
                    this.budgetForm.controls.theme.value!
                  )
                }
                break;
            case ModalAction.add:
                if (this.budgetsComponentService.formHasValues(this.budgetForm)) {
                  this.budgetsService.sendAddAction(
                    this.budgetForm.controls.category.value!,
                    this.budgetForm.controls.maximum.value!,
                    this.budgetForm.controls.theme.value!
                  );
                }
                break;
        }

        this.budgetForm.reset();
        this.actionEvent.emit();
    }

    updateCategory(newCategory: Option) {
        this.subs.push(
          this.budgetsService.findCategoryValueByIdFromStore(newCategory.id)
            .subscribe(category => {
              this.budgetForm.controls.category.setValue(category);
            })
        );
    }

    updateTheme(newTheme: Option) {
        this.subs.push(this.themes$.subscribe(themes => {
          this.budgetForm.controls.theme.setValue(Utils.findOptionById(themes, newTheme.id).value);
        }));
    }

    private initForm() {
        this.enableSelects = false;

        this.subs.push(
          this.budgetsService.getSelectedBudgetFromStore(this.category)
            .subscribe((budget: Budget) => {
              this.budgetForm.controls.maximum.setValue(budget.maximum);
              this.budgetForm.controls.category.setValue(budget.category);
            })
        );

        this.selectedTheme$ = this.budgetsService.getSelectedThemesFromStore(this.category, this.action)
        this.selectedCategory$ = this.budgetsService.getSelectedCategoryFromStore(this.category, this.action);
    }
}

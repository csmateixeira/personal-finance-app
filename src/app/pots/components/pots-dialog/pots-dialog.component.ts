import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {Dialog} from 'primeng/dialog';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {SelectComponent} from '../../../shared/components/select/select.component';
import {DialogAction} from '../../../shared/models/dialog-action.model';
import {combineLatest, map, Observable, Subscription, tap} from 'rxjs';
import {Option} from '../../../shared/models/option.model';
import {DialogUtils} from '../../../shared/utils/dialog.utils';
import {selectBudgetsThemes} from '../../../budgets/state/budgets.state';
import {Theme} from '../../../shared/models/theme.model';
import {Store} from '@ngrx/store';
import {Pot} from '../../models/pot.model';
import {selectPotsData} from '../../state/pots.state';
import {Utils} from '../../../shared/utils/utils';
import {PotsActions} from '../../state/pots.actions';

@Component({
  selector: 'app-pots-dialog',
  imports: [
    AsyncPipe,
    Dialog,
    NgOptimizedImage,
    ReactiveFormsModule,
    SelectComponent
  ],
  templateUrl: './pots-dialog.component.html',
  styleUrl: './pots-dialog.component.scss'
})
export class PotsDialogComponent implements OnInit, OnDestroy {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly store: Store = inject(Store);
  protected readonly DialogAction = DialogAction;

  @Input() action!: DialogAction;
  @Input() showDialog!: boolean;
  @Input() name!: string;

  @Output() actionEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeDialogEvent: EventEmitter<void> = new EventEmitter<void>();

  pots$: Observable<Pot[]> = this.store.select(selectPotsData);
  themes$: Observable<Option[]> = this.store.select(selectBudgetsThemes).pipe(
    map((themes: Theme[]): Option[] => themes.map((theme: Theme) => ({
      id: theme.id,
      value: theme.name,
      prefix: theme.color,
      postfix: theme.isUsed ? 'Already used' : ''
    })))
  );
  selectedPot$?: Observable<Pot>;
  selectedTheme$?: Observable<number>;

  title: string = '';
  description: string = '';
  buttonText: string = '';
  enableSelects: boolean = true;

  potsForm = this.formBuilder.group({
    name: this.formBuilder.control<string | null>(null, Validators.required),
    target: this.formBuilder.control<number | null>(null, [Validators.required, Validators.min(0)]),
    theme: this.formBuilder.control<string | null>(null, Validators.required)
  });

  private readonly subs: Subscription[] = []

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }

  ngOnInit(): void {

    switch (this.action) {
      case DialogAction.delete:
        this.updateDetails(`Delete ${this.name}?`,
          'Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.',
          'Yes, Confirm Deletion');
        break;
      case DialogAction.edit:
        this.updateDetails('Edit Pot',
          'If your saving targets change, feel free to update your pots.',
          'Save Changes');
        this.initForm();
        break;
      case DialogAction.add:
        this.updateDetails('Add New Pot',
          'Create a pot to set savings targets. These can help keep you on track as you save for special purchases.',
          'Add Pot');
        break;
    }
  }

  closeDialog() {
    this.closeDialogEvent.emit();
  }

  updateTheme(newTheme: Option) {
    this.subs.push(this.themes$.subscribe(themes => {
      this.potsForm.controls.theme.setValue(Utils.findOptionById(themes, newTheme.id).value);
    }));
  }

  submit() {
    switch (this.action) {
      case DialogAction.delete:
        break;
      case DialogAction.edit:
        if (!this.formHasValues()) {
          this.sendEditAction();
        }
        break;
      case DialogAction.add:
        break;
    }

    this.potsForm.reset();
    this.actionEvent.emit();
  }

  private sendEditAction() {
    this.store.dispatch(PotsActions.editPot({
      newPot: {
        name: this.potsForm.controls.name.value!,
        target: this.potsForm.controls.target.value!,
        theme: this.potsForm.controls.theme.value!,
        total: 0
      }
    }));
  }

  private formHasValues() {
    return this.potsForm.controls.name.value && this.potsForm.controls.target.value && this.potsForm.controls.theme.value;
  }

  private initForm() {
    this.enableSelects = false;

    this.selectedPot$ = this.pots$.pipe(
      map((pots: Pot[]): Pot => pots.find((pot: Pot) => pot.name === this.name)!),
      tap((pot: Pot) => {
        this.potsForm.controls.target.setValue(pot.target);
        this.potsForm.controls.name.setValue(pot.name);
      })
    );

    this.selectedTheme$ = combineLatest([this.themes$, this.selectedPot$]).pipe(
      map(([themes, selectedPot]: [Option[], Pot]): number => DialogUtils.getSelectedTheme(this.action, themes, selectedPot))
    );
  }

  private updateDetails(title: string, description: string, buttonText: string) {
    this.title = title;
    this.description = description;
    this.buttonText = buttonText
  }
}

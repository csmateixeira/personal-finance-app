import {Component, Input} from '@angular/core';
import {CurrencyPipe, NgStyle, PercentPipe} from '@angular/common';

import {BudgetSpending} from '../../../../../models/features.models';

@Component({
  selector: 'app-budgets-card-spending',
  imports: [
    CurrencyPipe,
    PercentPipe,
    NgStyle
  ],
  templateUrl: './budgets-card-spending.component.html',
  styleUrl: './budgets-card-spending.component.scss'
})
export class BudgetsCardSpendingComponent {
  @Input() spending!: BudgetSpending;
  @Input() theme!: string;
}

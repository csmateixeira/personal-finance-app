import {Component, Input} from '@angular/core';
import {CurrencyPipe, NgStyle, PercentPipe} from '@angular/common';

import {Budget} from "../../../models/budget.model";

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
  @Input() budget!: Budget;
}

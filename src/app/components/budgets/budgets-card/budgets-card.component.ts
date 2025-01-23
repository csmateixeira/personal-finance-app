import {Component, Input} from '@angular/core';
import {BudgetsCardSummaryComponent} from "./budgets-card-summary/budgets-card-summary.component";
import {BudgetsCardSpendingComponent} from "./budgets-card-spending/budgets-card-spending.component";
import {BudgetsCardLatestComponent} from "./budgets-card-latest/budgets-card-latest.component";
import {Budget} from "../../../../models/features.models";

@Component({
  selector: 'app-budgets-card',
  imports: [
    BudgetsCardSummaryComponent,
    BudgetsCardSpendingComponent,
    BudgetsCardLatestComponent,
  ],
  templateUrl: './budgets-card.component.html',
  styleUrl: './budgets-card.component.scss'
})
export class BudgetsCardComponent {
  @Input() budget!: Budget;
}

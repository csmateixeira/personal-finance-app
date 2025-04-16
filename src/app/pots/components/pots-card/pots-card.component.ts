import {Component, Input} from '@angular/core';
import {Pot} from "../../models/pot.model";
import {PotsCardSummaryComponent} from './pots-card-summary/pots-card-summary.component';
import {PotsCardAmountComponent} from './pots-card-amount/pots-card-amount.component';

@Component({
  selector: 'app-pots-card',
  imports: [
    PotsCardSummaryComponent,
    PotsCardAmountComponent
  ],
  templateUrl: './pots-card.component.html',
  styleUrl: './pots-card.component.scss'
})
export class PotsCardComponent {
  @Input() pot!: Pot;
}

import {Component, Input} from '@angular/core';
import {Pot} from '../../../models/pot.model';
import {CurrencyPipe, NgStyle, PercentPipe} from '@angular/common';

@Component({
  selector: 'app-pots-card-amount',
  imports: [
    CurrencyPipe,
    PercentPipe,
    NgStyle
  ],
  templateUrl: './pots-card-amount.component.html',
  styleUrl: './pots-card-amount.component.scss'
})
export class PotsCardAmountComponent {
  @Input() pot!: Pot;
}

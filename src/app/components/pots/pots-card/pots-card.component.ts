import {Component, Input} from '@angular/core';
import {Pot} from '../../../../models/features.models';
import {CurrencyPipe, NgStyle, PercentPipe} from '@angular/common';

@Component({
  selector: 'app-pots-card',
  imports: [
    NgStyle,
    CurrencyPipe,
    PercentPipe
  ],
  templateUrl: './pots-card.component.html',
  styleUrl: './pots-card.component.scss'
})
export class PotsCardComponent {
  @Input() pot!: Pot;
}

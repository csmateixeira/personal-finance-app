import {Component, Input} from '@angular/core';
import {CurrencyPipe, NgStyle, PercentPipe} from '@angular/common';
import {Pot} from "../../models/pot.model";

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

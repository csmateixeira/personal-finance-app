import {Component, Input} from '@angular/core';
import {Pot} from '../../../models/pot.model';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-pots-card-summary',
  imports: [
    NgStyle
  ],
  templateUrl: './pots-card-summary.component.html',
  styleUrl: './pots-card-summary.component.scss'
})
export class PotsCardSummaryComponent {
  @Input() pot!: Pot;
}

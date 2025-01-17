import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Option} from '../../../utils/models';
import {NgClass, NgOptimizedImage, NgStyle} from '@angular/common';

@Component({
  selector: 'app-select',
  imports: [
    FormsModule,
    NgStyle,
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent implements OnInit{
  @Input({required: true}) options!: Option[];
  @Input({required: true}) selected!: number;

  @Output() updateEvent: EventEmitter<Option> = new EventEmitter<Option>();

  showContent: boolean = false;
  selectedText: string = '';

  ngOnInit(): void {
    this.selectedText = this.getSelectedText();
  }

  toggleContent() {
    this.showContent = !this.showContent;
  }

  selectOption(option: Option) {
    this.updateEvent.emit(option);

    this.selected = option.id;
    this.selectedText = this.getSelectedText();
  }

  getSelectedText(): string {
    return this.options.find((option: Option) => option.id === this.selected)?.value ?? '';
  }
}

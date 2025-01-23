import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Option} from '../../../../models/models';
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
export class SelectComponent implements OnInit {
    @Input() options!: Option[];
    @Input() selected!: number;
    @Input() enabled: boolean = true;

    @Input() withLabel: boolean = false;
    @Input() label?: string;

    @Input() withPrefix: boolean = false;
    @Input() withPostfix: boolean = false;

    @Output() updateEvent: EventEmitter<Option> = new EventEmitter<Option>();

    showContent: boolean = false;
    selectedText: string = '';
    selectedTheme: string = '';

    ngOnInit(): void {
        this.initializeSelectedOption();
    }

    toggleContent() {
        if (this.enabled) {
            this.showContent = !this.showContent;
        }
    }

    selectOption(option: Option) {
        this.updateEvent.emit(option);

        this.selected = option.id;

        this.initializeSelectedOption();
    }

    initializeSelectedOption(): void {
        const selectedOption: Option = this.options.find((option: Option) => option.id === this.selected) ?? this.options[0];

        this.selectedText = selectedOption.value;
        this.selectedTheme = selectedOption.prefix ?? '';
    }
}

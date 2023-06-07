import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {
  @Input() suggestions !: string[];
  @Output() suggestionSelected: EventEmitter<string> = new EventEmitter<string>();

  selectSuggestion(suggestion: string) {
    this.suggestionSelected.emit(suggestion);
  }
}

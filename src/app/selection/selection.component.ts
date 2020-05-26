import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css'],
})
export class SelectionComponent {
  default: any;
  id: any;
  displayContent: any;

  @Input()
  set selection(selection) {
    this.default = selection.default;
    this.id = selection.id;
    this.displayContent = Array.isArray(selection.DisplayContent)
      ? selection.DisplayContent
      : [selection.DisplayContent];
  }

  @Output()
  updateSelection = new EventEmitter<any>();

  @Output()
  deleteSelection = new EventEmitter<any>();

  dataChanged(e) {
    this.updateSelection.emit({
      default: this.default,
      id: this.id,
      DisplayContent: this.displayContent,
      [e.target.name]: e.target.value,
    });
  }

  addDisplayContent() {
    this.updateSelection.emit({
      default: this.default,
      id: this.id,
      DisplayContent: this.displayContent.concat({ type: '', content: '' }),
    });
  }

  deleteSelectionHandler() {
    this.deleteSelection.emit();
  }

  displayContentChange(e, idx) {
    const newDisplayContent = [...this.displayContent];
    newDisplayContent[idx] = {
      ...newDisplayContent[idx],
      [e.target.name]: e.target.value,
    };
    this.updateSelection.emit({
      default: this.default,
      id: this.id,
      DisplayContent: newDisplayContent,
    });
  }

  deleteDisplayContent(idx) {
    this.displayContent.splice(idx, 1);
    this.updateSelection.emit({
      default: this.default,
      id: this.id,
      DisplayContent: [...this.displayContent],
    });
  }
}
